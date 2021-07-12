const { has } = require('lodash');
module.exports = api => {
    if (has(api, 'cache')) {
        api.cache(true);
    }
    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        App: './App',
                    },
                },
            ],
            'react-native-reanimated/plugin',
            ["module:react-native-dotenv", {
                "moduleName": "@env",
                "path": ".env",
                "blacklist": null,
                "whitelist": null,
                "safe": true,
                "allowUndefined": true
            }]
        ],
    };
};
