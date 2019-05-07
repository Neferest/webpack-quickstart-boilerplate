const webpackMerge = require('webpack-merge');

module.exports = (addons) => {
    const loadedAddons = addons.map(addOn => {
        return require(`./addons/webpack.${addOn}`)();
    });

    return webpackMerge({}, ...loadedAddons);
}