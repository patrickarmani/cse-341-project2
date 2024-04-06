const router = require('express').Router();
const userCont = require('../controllers/users');
const countryCont = require('../controllers/countries');
const { saveUser, saveCountry } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const passport = require('passport');

router.use("/", require("./swagger"));

router.use("/users", require("./countries"));
//

router.use("/countries", require("./users"));


// Root route
router.get('/', (req, res) => { 
    res.send('Countries of the World');
});

// Login route with GitHub authentication
router.get('/login', passport.authenticate('github'));

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// User routes
router.get('/users', isAuthenticated, userCont.getAll);
router.get('/users/:id', isAuthenticated, userCont.getSingle);
router.post('/users', isAuthenticated, saveUser, userCont.createUser);
router.put('/users/:id', isAuthenticated, saveUser, userCont.updateUser);
router.delete('/users/:id', isAuthenticated, userCont.deleteUser);

// Country routes
router.get('/countries', isAuthenticated, countryCont.getAll);
router.get('/countries/:id', isAuthenticated, countryCont.getSingle);
router.post('/countries', isAuthenticated, saveCountry, countryCont.createCountry);
router.put('/countries/:id', isAuthenticated, saveCountry, countryCont.updateCountry);
router.delete('/countries/:id', isAuthenticated, countryCont.deleteCountry);

module.exports = router;
