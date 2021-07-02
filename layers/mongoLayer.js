const  { createLayer} = require("./createLayer");

const projects = {
    1: {id: 1, name: 'Project 1'}
}

const find_project = (id) => {
    return projects[id];
}

const config = {
    // Example without adapters
    get_project: {
        func(id) {
            return find_project(id);
        }
    },
};

module.exports.layer = createLayer(config)