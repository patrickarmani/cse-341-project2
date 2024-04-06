const express = require('express');
const bodyParser = require('body-parser');
//const mongodb = require('./data/database');
const app = express();
const cors = require('cors');
const passport = require('passport');
const dataBase = require('./models');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv').config;


const port = process.env.PORT || 3001;
//---Middleware--
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  // This is the basic express session({..}) initialization.
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  //allow passport to use "express-session".
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
});
app.use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(cors({ origin: '*'}));
app.use(bodyParser.json());
app.use('/', require('./routes'));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.clientID}`
      : "Logged Out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

//process.on('uncaughtException', (err, origin) => {
  //console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
//});

/****************************
 * Error handling
 ****************************/
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({ message: err.message });
})

//mongodb.initDb((err) => {
  //if(err) {
    //console.log(err);
  //}
  //else {
    //app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
  //}
//});

/**************************
 * Verify database operation
 **************************/
dataBase.mongoose.connect(
  process.env.MONGODB_URI)
  .then(() => {
      app.listen(port, () => {
          console.log(`Connected to database on port: ${port}`);
      });
  })
  .catch((err) => {
      console.error('Cannot connect to the database', err);
      process.exit();
  });