const mysql = require('mysql');
const Status = require('../../Classes/Status');

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
    if(!project.length)
        throw Status.notFound(`Project: ${project_id} not found`);
    else
        return project;
}

const sqlToJson = (val) => {
    results = JSON.stringify(val); // Convert the results object to a string, remove RowDataPacket
    json = JSON.parse(results); //Convert the results string to a json object
    return json;
}

module.exports = {
    get_project: get_project,
    sqlToJson: sqlToJson
}