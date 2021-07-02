//const  { createLayerApi, ValidationError } = require("../layers/createLayer");
//const { isAFunction } = require("../utils/index");

const testFunc = (v) => v + 1; // Simple test function for example
describe.only("some test", () => {
    const actual = true;
    const expected = true;
    expect(actual).toBe(expected);   
})

// const adapterOnly = {
//     // Example with a proper name, but no `func`
//     testFunction: {
//         adapter: testFunc
//     }
// };

// const improperFunc = {
//     // Example with a proper name, but improper func
//     testFunction: {
//         func: "string text"
//     }
// };

// const functionOnly = {
//     // Example with a proper name, with a function, and neither func nor adapter
//     testFunction: testFunc
// };

// const funcDefinition = {
//     // Example with a proper name, and func of type "function"
//     testFunction: {
//         func: testFunc
//     }
// };

// const funcAndAdapter = {
//     // Example with a proper name, adapter, and func of type "function"
//     testFunction: {
//         adapter: testFunc,
//         func(v) {
//             return testFunc(this.adapter(v));
//         }
//     }
// };

// const multipleFuncs = {
//     // Example with two proper functions, without adapters
//     addFunction: {
//         func(num) {
//             return testFunc;
//         }
//     },
//     subtractFunction: {
//         func(num) {
//             return num - 1;
//         }
//     }
// };

// const multipleFuncsWithAdapter = {
//     // Example with two proper functions, without adapters
//     testFunction: {
//         adapter: testFunc,
//         func(v) {
//             return this.adapter(v);
//         }
//     },
//     addFunction: {
//         adapter: testFunc,
//         func(num) {
//             return this.adapter(num);
//         }
//     },
//     subtractFunction: {
//         func: (num) => num - 1
//     }
// };

// const funcUsingArrowFunction = {
//     // Example with a proper name, adapter, and func of type "function"
//     testFunction: {
//         adapter: testFunc,
//         func: (v) => testFunc(this.adapter(v))
//     }
// };

// // LayerConfig that will fail
// const invalidLayerConfigs = {
//     testFunc,
//     improperFunc,
//     adapterOnly
// };

// // LayerConfig that will succeed
// const validLayerConfigs = {
//     functionOnly,
//     funcDefinition,
//     funcAndAdapter,
//     multipleFuncs,
//     multipleFuncsWithAdapter
// };

// export const catchError = (func) => {
//     try {
//         func();
//         return null;
//     } catch (e) {
//         return e;
//     }
// };

// describe("createLayerApi", () => {
//     describe("should produce an api corresponding to the config", () => {
//         const layer = createLayerApi(multipleFuncs);
//         const actual = Object.keys(multipleFuncs).every((key) =>
//             isAFunction(layer[key])
//         );
//         const expected = true;
//         expect(actual).toBe(expected);
//     });

//     it.each(Object.entries(invalidLayerConfigs))(
//         "%s should throw an error when called with an invalid configuration",
//         (key, config) => {
//             const err = catchError(() => createLayerApi(config));
//             const actual = err instanceof ValidationError;
//             const expected = true;
//             expect(actual).toBe(expected);
//         }
//     );

//     it.each(Object.entries(validLayerConfigs))(
//         "%s should succeed with a valid set of functions",
//         (key, value) => {
//             const layer = createLayerApi(value);
//             const actual = Object.values(layer).every(isAFunction);
//             const expected = true;
//             expect(actual).toBe(expected);
//         }
//     );

//     it.each(Object.entries(validLayerConfigs))(
//         "%s's functions should return a Promise",
//         (key, value) => {
//             const layer = createLayerApi(value);
//             const actual = Object.values(layer).every((func) =>
//                 isAPromise(func())
//             );

//             const expected = true;
//             expect(actual).toBe(expected);
//         }
//     );
//     it("can't use adapters with arrow functions", async () => {
//         const actual = await createLayerApi(funcUsingArrowFunction)
//             .testFunction(0)
//             .catch((e) => e instanceof TypeError);

//         const expected = true;
//         expect(actual).toBe(expected);
//     });
// });
