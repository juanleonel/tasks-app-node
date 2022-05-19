import Tasks from '../models/tasks';

module.exports = app => {

    app.route('/tasks')
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
        const { title, description, done } = req.body;
        const _tasks = new Tasks();
        _tasks.title = title;
        _tasks.done = false;
        _tasks.description = description;
        _tasks.created_at = new Date();
        _tasks.save((err, taskStored) => {
            if(err) return res.status(500),send({message: 'Error al guardar la tarea'});

            if(!taskStored) return res.status(404).send({message: 'No se pudo guardar'});

            return res.status(202).send({message: 'Ok', item: taskStored})
        })
    });

    app.route('tasks/:id')
    .all((req, res, next) => {
        if (req.body) delete req.body.id;

        next();
    })
    .get((req, res) => {
        const { id } = req.params.id;
        Tasks.findById(id, (err, taskFinded) => {
            if(err) return res.status(500).send({message:"Not found"});

            if(!taskFinded) return res.status(404).send({message:"La tarea no existe"});

            return res.status(200).send({
                msg: 'ok',
                item: taskFinded
            });
        });
    })
    
    .delete((req, res) => {
        
    })
}