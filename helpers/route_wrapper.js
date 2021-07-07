const Status = require('../Classes/Status');

/**
 * A pure function that will taken in the params object and transform it to fit the routeHandler
 * This function is the only piece in the route handling that should have full knowledge of the sever's state and context
 * @module ParamsTransformer
 * @function
 * @param {Object} params
 * @return {Object}
 */

/**
 * this function will analyze the url, params, and body for any mistakes
 * and throw a specific error if any are found
 * @module ReqValidator
 * @function
 * @param {Request} reqObject
 */

/**
 *
 * @module RouteHandler
 * @function
 * @param {Object} modifiedParams
 * @return {*}
 */

/**
 *
 * @param {RouteHandler[]} routeHandlers
 * @param {Object[]} params
 * @returns {*}
 */
const runner = (routeHandlers, params) =>
  routeHandlers.reduce((acc, handler) => handler(...acc), params);


const pullErrorDetails = (err) =>{
  return Status.isStatus(err) ? err : Status.error(err);
};

/**
 *
 * @param {ParamsTransformer[]} paramTransformers
 * @param {ReqValidator} requestObject
 * @param {RouteHandler|RouteHandlerp[]} routeHandler
 */

const routeWrapper = (reqValidator, paramTransformers, routeHandler) => async (
  req,
  res
) => {
  try {

    await Array.isArray(reqValidator) ? 
      reqValidator.forEach((validator) => validator(req)) :
      reqValidator(req); // this will throw an error if any validation fails

    const finalParams = paramTransformers
      .map((transformer) => transformer(req.params, req.body))
      .concat(req);

      routeHandler()

      // const result = await (Array.isArray(routeHandler) // a series of functions
      // ? runner(routeHandler, finalParams)
      // : routeHandler(...finalParams));

    return res.status(200).json(result);
  } catch (err) {

    //console.log(err)
    res.status(500).json({})
    //const status = pullErrorDetails(err);
    //return res.status(status.code).send(status);
  } finally {
    res.end(); // this will always run, pass or fail
  }
};

module.exports.routeWrapper = routeWrapper;