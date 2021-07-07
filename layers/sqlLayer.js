const  { createLayer} = require("./createLayer");
const sql = require('./databases/sql');

const config = {
    get_project: {
        adapter: sql.sqlToJson,
        async func(params) {
            return this.adapter(await sql.get_project(params));
        }
    },
};

module.exports.layer = createLayer(config)