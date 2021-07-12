import { CommonActions, StackActions, NavigationContainerRef, DrawerActions } from '@react-navigation/native';

let navigator: NavigationContainerRef;

export function setTopLevelNavigator(navigatorRef: NavigationContainerRef): void {
  navigator = navigatorRef;
}

export function setParams(params: object) {
  navigator.dispatch(CommonActions.setParams(params));
}

export function navigate(name: string, params: object = {}, key?: any): void {
  navigator.dispatch(CommonActions.navigate({ name, params, ...(!!key && { key }) }));
}

export function goBack(): void {
  navigator.dispatch(CommonActions.goBack());
}

export function pop(numberPop: number = 1): void {
  navigator.dispatch(StackActions.pop(numberPop));
}

export function push(name: string, params: object = {}): void {
  navigator.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params: object = {}): void {
  navigator.dispatch(StackActions.replace(name, params));
}

export function reset(name: string, params: object = {}): void {
  navigator.dispatch(StackActions.popToTop());
  replace(name, params);
}

export function openDrawer(): void {
  navigator.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer(): void {
  navigator.dispatch(DrawerActions.closeDrawer());
}

export function toggleDrawer(): void {
  navigator.dispatch(DrawerActions.toggleDrawer());
}

export function getCurrentOptions(): object | undefined {
  return navigator.getCurrentOptions();
}

export function getCurrentRoute(): object | undefined {
  return navigator.getCurrentRoute();
}

export function navigateAndReset(routeName: string, params: object = {}) {
  return navigator.dispatch({
    ...StackActions.popToTop(),
    target: routeName,
  });

  /*
  {
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }*/
}

const NavigationService = {
  goBack,
  navigate,
  setTopLevelNavigator,
  pop,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  setParams,
  getCurrentOptions,
  getCurrentRoute,
  push,
  replace,
  reset,
};

export default NavigationService;
