const { isAFunction, isAnObject, noop } = require('./index');

const defaultConfig = {
    adapter: undefined,
    func: undefined,
    depricating: false,
    forceSync: false
};

module.exports = {

    /**
     * Layer Config definition
     * @typedef {Object} LayerConfig
     * @property {Adapter} [adapter]
     * @property {LayerFunc} [func]
     * @property {boolean} [depricating]
    */
    defaultConfig: defaultConfig,

    depricatedFunc: (config) => {
        const { alt, date } = isAnObject(config.depricated)
            ? config.depricated
            : {};

        return () => {
            console.warn(
                `${config.name} is being depricated.`,
                date && `It will no longer be available as of ${date}.`,
                alt && `Please use ${alt} instead.`
            );
            return noop();
        };
    },

     normalizeFunctionConfig: (config = {}) => {
        // If the config is a function, return the function inside an object
        if (isAFunction(config)) {
            return {
                ...defaultConfig,
                func: config
            };
        }
    
        if (!config.func) throw configValidationError;
    
        return {
            ...defaultConfig,
            ...config,
    
            // If depricating, return the "depricatedFunc" function
            func: config?.depricating ? depricatedFunc(config) : config.func // else return the function
        };
    }
}
