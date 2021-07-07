const Status = require('../../Classes/Status');
const {pick, remove} = require('../../helpers/tools')

// Retrieve
var MongoClient = require('mongodb').MongoClient;

const connect = () => new Promise((res, rej) => {
    MongoClient.connect("mongodb://localhost:27017/core_app_staging", (err, db) => {
        err ? rej(err) : res(db)
    });
});

const remove_mongo_id = (obj) => remove("_id", obj);

const get_project = async ({project_id}) => {
    const conn = await connect();
    const db = conn.db("core_app_staging");
    const project = await db.collection("projects").findOne({id: project_id});
    if(!project)
        throw Status.notFound(`Project: ${project_id} not found`);
    else
        return project;
}

module.exports = {
    get_project: get_project,
    remove_mongo_id: remove_mongo_id
}