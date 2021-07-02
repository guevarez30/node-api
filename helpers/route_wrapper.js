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

class Status {
  constructor(statusCode, message = "") {
    this.code = statusCode;
    this.message = message;
  }
  static isStatus(testVal) {
    return testVal instanceof Status;
  }

  static ok(s) {
    return new Status(200, s);
  }

  static error(s) {
    return new Status(500, s);
  }

  static unauthorized(s) {
    return new Status(401, s);
  }

  static invalid(s) {
    return new Status(400, s);
  }
  static notFound(s) {
    return new Status(404, s);
  }
}

/**
 *
 * @param {ParamsTransformer[]} paramTransformers
 * @param {ReqValidator} requestObject
 * @param {RouteHandler|RouteHandlerp[]} routeHandler
 */
const routeWrapper = (paramTransformers, reqValidator, routeHandler) => async (
  req,
  res
) => {
  try {
    reqValidator(req); // this will throw an error if any validation fails
    
    const finalParams = paramTransformers
      .map((transformer) => transformer(req.params))
      .concat(req);

    const result = await (Array.isArray(routeHandler) // a series of functions
       ? runner(routeHandler, finalParams)
       : routeHandler(...finalParams));

    return res.status(Status.ok().code).json(result);
  } catch (err) {
    console.log(err)
    res.status(401).json({})
  } finally {
    res.end(); // this will always run, pass or fail
  }
};

module.exports.routeWrapper = routeWrapper;