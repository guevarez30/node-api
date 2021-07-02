const kindOf = require("kind-of");

module.exports = {

    isAFunction: (val) => kindOf(val) === "function",

    isAnObject: (val) => kindOf(val) === "object",

    /** NOOP
        * A function that doesn't do anything
        * The purpose of this is when the function is going to called reguardless -
        * and you don't want it to do anything.
        * For example if you are depricating function call, you can disable it with a noop before reworking the callsite
        *
    */
    noop: () => Promise.resolve()
}