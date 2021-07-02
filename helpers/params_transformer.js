const parseProjectId = ({project_id}) => {
    return {
        project_id: parseInt(project_id)
    }
};

module.exports = {
    parseProjectId: parseProjectId
}
