import Users from '../models/users';
import bcrypt from "bcrypt";

module.exports = app => {

    app.route('/user')
    .get((req, res) => {
        Users.find({})
        .exec((err, users) => {
            if(!users) return res.status(404).send({message:"no hay usuarios por mostrar"});
            return res.status(200).send({
                users
            });
        });
    })
    .post((req, res) => {
        const { name, email, password } = req.body;
        const salt = bcrypt.genSaltSync();
        const _user = new Users();
        _user.name = name;
        _user.email = email;
        _user.password = bcrypt.hashSync(password, salt);
        _user.created_at = new Date();
        _user.enable = true;
        _user.save((err, userStored) => {
            if(err) return res.status(500),send({message: 'Error el usuario'});

            if(!userStored) return res.status(404).send({message: 'No se pudo guardar'});

            return res.status(202).send({message: 'Ok', item: userStored})
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