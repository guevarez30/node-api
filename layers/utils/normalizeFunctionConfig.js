const { isAFunction, isAnObject, noop } = require('./index');
const Status = require('../../Classes/Status');

const defaultConfig = {
    adapter: undefined,
    func: undefined,
    depricated: false,
    forceSync: false
};

const depricatedFuncError = (config, funcName) => {
    const { alt, date } = isAnObject(config.depricated)
        ? config.depricated
        : {};

    let err =  `${funcName} is being depricated.`;
    err = date ? err + `\nIt will no longer be available as of ${date}.` : err;
    err = alt ? err + `\nPlease use ${alt} instead.` : err;
    return err;
}

module.exports = {

    /**
     * Layer Config definition
     * @typedef {Object} LayerConfig
     * @property {Adapter} [adapter]
     * @property {LayerFunc} [func]
     * @property {boolean} [depricating]
    */
    defaultConfig: defaultConfig,

    normalizeFunctionConfig: (config = {}, funcName = "") => {

        // If the config is a function, return the function inside an object
        if (isAFunction(config)) {
            return {
                ...defaultConfig,
                func: config
            };
        }

        if (!config.func) throw configValidationError;
        if(config.depricated) throw depricatedFuncError(config, funcName);

        return {
            ...defaultConfig,
            ...config,
            func: config.func 
        };
    }
}
