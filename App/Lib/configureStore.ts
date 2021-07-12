// Node modules
import { applyMiddleware, createStore, Middleware, Store, StoreEnhancer, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { RootStateDefault } from 'App/Redux';
import rootSaga from 'App/Sagas';
import Reactotron from './ReactotronConfig';

function bindMiddleware(middlewares: Middleware[]): StoreEnhancer {
  return applyMiddleware(...middlewares);
}

/**
 * Create store instance
 */
function createStoreWithConfig(): Store {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware];
  // eslint-disable-next-line
  if (__DEV__) {
    const { createLogger } = require('redux-logger');
    middlewares.push(
      createLogger({
        collapsed: true,
        diff: true,
      }),
    );
  }
  const enhancers: StoreEnhancer<{}, {}>[] = [];
  enhancers.push(bindMiddleware(middlewares));
  if (Reactotron && Reactotron.createEnhancer) enhancers.push(Reactotron.createEnhancer());
  const store = createStore(rootReducer, RootStateDefault, compose(...enhancers));

  sagaMiddleware.run(rootSaga);

  return store;
}

export default createStoreWithConfig;
