const { createLayerFunc } = require("./utils/createLayerFunc");
const { normalizeFunctionConfig } = require("./utils/normalizeFunctionConfig");
const { isAnObject, isAFunction } = require("./utils/index");

/**
     *
     * @param {Object<string, LayerFunc>} layer - an object that we will be building onto
     * @param {[string, LayerConfig]} - this will define the new function, name being the new name, and the config used to build the function
*/
const addLayerFuncToLayer = (layer, [functionName, functionConfig]) => {

    if (checkIsValidLayerFuncConfig(functionConfig)) {
        layer[functionName] = createLayerFunc(
            functionName, // name is needed here to help with debugging later
            // because config can be a function, or an object with various params,
            // we normalize to ensure how ever it came in, it has all of the necessary parts
            normalizeFunctionConfig(functionConfig, functionName)
        );
        return layer;
    } else {
        throw configValidationError;
    }
};

const checkIsValidLayerFuncConfig = (config) => isAnObject(config)
    ? config.func && isAFunction(config.func)
    : isAFunction(config);


module.exports = {

    addLayerFuncToLayer: addLayerFuncToLayer,

    checkIsValidLayerFuncConfig: checkIsValidLayerFuncConfig,

    /**
     * For as important as having a well done abstraction layer maybe
     * the code is really quite bland
     * all that is done here is to convert the configuration
     * @param {Object.<LayerConfig>} layerConfig
     * @returns {Object.<string, LayerFunc>}
    */
    createLayer: (layerConfig) => {
        if (!isAnObject(layerConfig)) throw configValidationError;
        return Object.entries(layerConfig).reduce(addLayerFuncToLayer, {});
    }
}

class ValidationError extends Error {
     constructor(message) {
         super(message); // (1)
         this.name = "ValidationError";
     }
}

const configValidationError = new ValidationError(`
    The configuration must either be a function eg. \`{ yourFunctionName: () => '' }\`
    or have the property \`func\` with a function eg. 
    \`{ 
        yourFunctionName: { 
            func: () => '' 
        }  
    }\` 
`);