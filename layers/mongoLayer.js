const  { createLayer} = require("./createLayer");
const mongo = require('./databases/mongo')

const config = {
    get_project: {
        adapter: mongo.remove_mongo_id,
        async func(params) {
            return this.adapter(await mongo.get_project(params));
        }
    },
};

module.exports.layer = createLayer(config)