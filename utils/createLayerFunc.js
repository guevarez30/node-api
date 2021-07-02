const logError = (err, args, name, layerConfig) => {
    console.error(`${name} failed with `, ...args);
    console.error(layerConfig);
};

module.exports = {
    /**
     * Create a function that is guarunteed to return a Promise as well as have error catching built in
     * @param {string} name
     * @param {LayerConfig} layerConfig
     * @returns {LayerFunc}
    */
    createLayerFunc: (name, layerConfig) => {
        const { func } = layerConfig;
        if (layerConfig.forceSync) {
            return {
                [name](...args) {
                    try {
                        return func.call(layerConfig, ...args); // use `call` to ensure that if the function used `this` (meaning the config object) it would have the proper context. Without this, `this` would point to the global object
                    } catch (e) {
                        logError(e, args, name, layerConfig);
                        throw e;
                    }
                }
            }[name];
        }
        return {
            // `async` here automatically turns this into a `Promise`
            // using a rest opperator as the only param lets us capture any and all params without caring how many there are
            async [name](...args) {
                try {
                    return func.call(layerConfig, ...args); // use `call` to ensure that if the function used `this` (meaning the config object) it would have the proper context. Without this, `this` would point to the global object
                } catch (e) {
                    logError(e, args, name, layerConfig);
                    throw e;
                }
            }
        }[name]; // this is a slightly hacky way of giving a dynamically created function a name, this can help for logging purposes
    }
}