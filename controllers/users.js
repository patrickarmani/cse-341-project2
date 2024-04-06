const User = require('../models/users.js');

const getAll = async (req, res, next) => {
    //#swagger.tags=[Users]
    User.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'There was an issue retrieving the users'
            })

        });
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=[Users]
    const userId = req.params.id;
    User.find({ _id: userId })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Something went wrong during retrieval.'
            });
        });
    
};

const createUser = async (req, res) => {
    //#swagger.tags=[Users]
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        res.status(400).send({ message: 'Must include web site and country name' });
        return;
    }
    const user = new User(req.body);
    user.save()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err || 'There was an issue creating the user' });
        });
};

const updateUser = async (req, res) => {
    //#swagger.tags=[Users]
    const userId = req.params.id;
    if (!userId) {
        res.status(400).json('Must use valid country id to update country.');
        return;
    }
    const userDataToUpdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    User.findByIdAndUpdate(userId, userDataToUpdate, { new: true })
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'Something went wrong with the update' });
        });
};

const deleteUser = async (req, res) => {
    //#swagger.tags=[Users]
    const userId = req.params.id;
    if (!userId) {
        res.status(400).json('Must use valid country id to update country.');
    }
    User.deleteOne({ _id: userId })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send(); 
        })
        .catch((err) => {
            res.status(500).json({ message: err.message || 'There was a problem with the deletion.' });
        });
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };