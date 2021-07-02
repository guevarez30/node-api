const auth1 = (req) => {
    if(req.headers.api_key){
        return;
    }else{
        throw new Error('Missing API Key')
    }
}

const auth2 = async (req) => {
    console.log("Auth 2 Doesnt Require API Key");
    return;
}

module.exports = {
    auth1: auth1,
    auth2: auth2
}