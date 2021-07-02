const  { createLayer} = require("./createLayer");

const projects = [
    {
        id: 4338,
        organization_id: 1224,
        name: 'Example Project',
        section_id: null,
        descriptors: '___JSON___{}___',
        thumbnail: '/thumbnails/dc92eb9c-264f-48a1-895e-4204cea69b9d.png',
        created_by_user_id: 1078,
        created_at: '2021-04-26T15:38:46.000Z',
        updated_at: '2021-04-26T15:38:46.000Z',
        active: 1,
        trash: 0
    }
]

const get_project = ({project_id}) => {
    let project = projects.find((p) => p.id === project_id);
    return project;
}

const config = {
    // Example without adapters
    get_project: {
        func(id) {
            return get_project(id);
        }
    },
};

module.exports.layer = createLayer(config)