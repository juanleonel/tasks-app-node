module.exports = app => {
    const Task = app.models.tasks;

    app.get('/task', (req, res) => {
       Task.findAll({}, (tasks) => {
           res.json({'tasks': tasks});
       });
    })
}