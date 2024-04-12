const router = require('express').Router();
const usersController = require('../controllers/users');
const countriesController = require('../controllers/countries');
const { saveUser, saveCountry } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const passport = require('passport');

router.use("/", require("./swagger"));

// Root route
router.get('/', (req, res) => { 
  res.send('Registration of countries around the world and their data!');
});

//router.use("/countries", require("./countries"));

//router.use("/users", require("./users"));



// Login route with GitHub authentication
router.get('/login', passport.authenticate('github'), (req, res) => { } );

// Logout route
router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/")
    });
  });

// User routes
router.get('/users', isAuthenticated, usersController.getAll);
router.get('/users/:id', isAuthenticated, usersController.getSingle);
router.post('/users', isAuthenticated, saveUser, usersController.createUser);
router.put('/users/:id', isAuthenticated, saveUser, usersController.updateUser);
router.delete('/users/:id', isAuthenticated, usersController.deleteUser);

// Country routes
router.get('/countries', countriesController.getAll);
router.get('/countries/:id', countriesController.getSingle);
router.post('/countries', isAuthenticated, saveCountry, countriesController.createCountry);
router.put('/countries/:id', isAuthenticated, saveCountry, countriesController.updateCountry);
router.delete('/countries/:id', isAuthenticated, countriesController.deleteCountry);

module.exports = router;