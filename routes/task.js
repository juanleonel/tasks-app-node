import Tasks from '../models/tasks';

module.exports = app => {

    app.route('/tasks')
    .all((req, res) => {
      delete req.body.id;
      next();
    })
    .get((req, res) => {
        Tasks.find({})
        .exec((err, tasks) => {
            if(!tasks) return res.status(404).send({message:"no hay tareas por mostrar"});
            return res.status(200).send({
                tasks
            });
        });
    })
    .post((req, res) => {
        // save tasks
    })

    app.route('tasks/:id')
    .all((req, res) => {
        delete req.body.id;
        next();
    })
    .get((req, res) => {
        
    })
    .post((req, res) => {
        const { title, done } = req.body;
        const _tasks = new Tasks();
        _tasks.title = title;
        _tasks.done = false;
        _tasks.save((err, taskStored) => {
            if(err) return res.status(500),send({message: 'Error al guardar la tarea'});

            if(!taskStored) return res.status(404).send({message: 'No se pudo guardar'});

            return res.status(202).send({message: 'Ok', item: taskStored})
        })
    })
    .delete((req, res) => {
        
    })
}