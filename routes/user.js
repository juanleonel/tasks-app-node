const Users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = app => {

    app.route('/user')
    .get( async (req, res) => {
        try {
            const result = await Users.find({}).exec();
            return res.status(200).send({
               'item': result
            });
        } catch (error) {
            res.sendStatus(500);
        }
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

    app.route('/user/:id')
    .all((req, res, next) => {
        if (req.body) delete req.body.id;

        next();
    })
    .get((req, res) => {
        const id  = req.params.id;
        Users.findById(id, (err, userFinded) => {
            if(err) return res.status(500).send({message:"Not found"});
            if(!userFinded) return res.status(404).send({message:"El usuario no existe"});
            return res.status(200).send({
                msg: 'ok',
                item: userFinded
            });
        });
    })
    .put((req, res) => {

    })
    .delete((req, res) => {
        let id = req.params.id;
        const user = new Users();
        user._id = id;
        user.enable = false;
        user.updated_at = new Date();
        Users.findByIdAndUpdate(id, user, {new: true}, (err, userUpdate)=>{
            console.log(err);
            if(err) return res.status(500).send({message:"Error al eliminar"});

            if(!userUpdate) return res.status(404).send({message:"No se ha podido elminar el usuario"});

            return res.status(200).send({item:userUpdate,message:"Usuario eliminado!"});
        });
    })
}