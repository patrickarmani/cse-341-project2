

/*const countriesController = require('../controllers/countries');
const validation = require('../middleware/validate');

router.get('/', countriesController.getAll);

router.get('/:id', countriesController.getSingle);

router.post('/', validation.saveCountry, countriesController.createCountry);

router.put('/:id', validation.saveCountry, countriesController.updateCountry);

router.delete('/:id', countriesController.deleteCountry);

module.exports = router;*/



const router = require('express').Router();
const usersController = require('../controllers/users');
const countriesController = require('../controllers/countries');
const { saveUser, saveCountry } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const passport = require('passport');

router.use('/', require('./swagger'));



//login and logout
router.get('/login', passport.authenticate('github'), (req, res) => { } );
router.get('/logout', function (req, res, next) {
        req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

//user routes
router.get('/users', usersController.getAll);
router.get('/users/:id', usersController.getSingle);
router.post('/users', saveUser, isAuthenticated, usersController.createUser);
router.put('/users/:id', saveUser, isAuthenticated, usersController.updateUser);
router.delete('/users/:id', isAuthenticated, usersController.deleteUser);


//country routes
router.get('/countries', countriesController.getAll);
router.get('/countries/:id', countriesController.getSingle);
router.post('/countries',  saveCountry, isAuthenticated, countriesController.createCountry);
router.put('/countries/:id', saveCountry, isAuthenticated, countriesController.updateCountry);
router.delete('/countries/:id', isAuthenticated, countriesController.deleteCountry);


module.exports = router;