const webpackMerge = require('webpack-merge');

module.exports = (addons) => {
    const loadedAddons = (typeof addons === "string")
        ? [ require(`./addons/webpack.${addons}`)() ]
        : addons.map(addOn => {
            return require(`./addons/webpack.${addOn}`)();
        });

    return webpackMerge({}, ...loadedAddons);
}