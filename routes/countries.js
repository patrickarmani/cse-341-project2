

const countriesController = require('../controllers/countries');
const validation = require('../middleware/validate');

router.get('/', countriesController.getAll);

router.get('/:id', countriesController.getSingle);

router.post('/', validation.saveCountry, countriesController.createCountry);

router.put('/:id', validation.saveCountry, countriesController.updateCountry);

router.delete('/:id', countriesController.deleteCountry);

module.exports = router;



const router = require('express').Router();
const userCont = require('../controllers/users');
const countryCont = require('../controllers/countries');
const { saveUser, saveCountry } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Welcome to the Library') });

//login and logout
router.get('/login', passport.authenticate('github'), (req, res) => { } );
router.get('/logout', function (req, res, next) {
        req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

//user routes
router.get('/users', userCont.getAll);
router.get('/users/:id', userCont.getSingle);
router.post('/users', saveUser, isAuthenticated, userCont.createUser);
router.put('/users/:id', saveUser, isAuthenticated, userCont.updateUser);
router.delete('/users/:id', isAuthenticated, userCont.deleteUser);


//country routes
router.get('/countries', countryCont.getAll);
router.get('/countries/:id', countryCont.getSingle);
router.post('/countries',  saveCountry, isAuthenticated, countryCont.createCountry);
router.put('/countries/:id', saveCountry, isAuthenticated, countryCont.updateCountry);
router.delete('/countries/:id', isAuthenticated, countryCont.deleteCountry);


module.exports = router;