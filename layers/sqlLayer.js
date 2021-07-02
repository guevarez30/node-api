const  { createLayer} = require("./createLayer");
const mysql = require('mysql');

const projects = [
    [1, "Project 1"],
    [2, "Project 2"]
]

const find_project = (id) => {
    return projects.find(p => p[0] === id);
}

const makeItAJSON = (val) => { 
    return {id: val[0], name: val[1]}
}

const config = {
    // Example with two proper functions, without adapters
    get_project: {
        adapter: makeItAJSON,
        func(id) {
            return this.adapter(find_project(id));
        }
    },
};

module.exports.layer = createLayer(config)