const Status = require('../Classes/Status');

const hasApiKey = (req) => {
    if(req.headers.api_key){
        return;
    }else{
        let status = new Status(401, "Missing API Key");
        throw status;
    }
}

module.exports = {
    hasApiKey: hasApiKey,
}