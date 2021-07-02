const  { createLayer} = require("./createLayer");
const mysql = require('mysql');

pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_HOST ?? 'localhost',
    user: process.env.MYSQL_USER ?? 'core_app_staging',
    password:
      process.env.MYSQL_PASSWORD ?? '0d1c565b-ae92-4965-b59f-c9b9f687d549',
    database: process.env.MYSQL_DATABASE ?? 'core_app_staging',
    multipleStatements: false,
});

const query = async (sql) => new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
        if(err)
            rej(err)
        else{
            connection.query({
                sql: sql,
                timeout:3000
            }, (err, rows) => {
                err ? rej(err) : res(rows)
            });
        }
    });
});

const get_project = async ({project_id}) => {
    let sql = `SELECT * FROM projects WHERE id = ${project_id}`;
    let project = await query(sql);
    return project;
}

const sqlToJson = (val) => {
    results = JSON.stringify(val); // Convert the results object to a string, remove RowDataPacket
    json = JSON.parse(results); //Convert the results string to a json object
    return json;
}

const config = {
    get_project: {
        adapter: sqlToJson,
        async func(params) {
            return this.adapter(await get_project(params));
        }
    },
};

module.exports.layer = createLayer(config)