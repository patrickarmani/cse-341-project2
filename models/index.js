const mongoose = require('mongoose');
const config = require('../config/db.config.js');
mongoose.Promise = global.Promise;

const dataBase = {};
dataBase.mongoose = mongoose;
dataBase.URL = config.url;
dataBase.user = require('./users.js')(mongoose);
dataBase.country = require('./countries.js')(mongoose);

module.exports = dataBase;