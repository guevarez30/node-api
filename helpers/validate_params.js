const {pick} = require('./tools');
const Status = require('../Classes/Status');

const valid_params = (names) => (params, ...obj) => {
    const filtered = pick(names)(params);
    names.forEach((n) => {
        if(!filtered.hasOwnProperty(n)){
            throw Status.invalid(`Missing Request Parameter: ${n}`)
        }
    });
    return filtered
}

module.exports= {
    valid_params: valid_params
}