const mongoose = require('mongoose');
const dbConfig = require('../config/db.config.js');
mongoose.Promise = global.Promise;

const dataBase = {};
dataBase.mongoose = mongoose;
dataBase.URL = dbConfig.url;
dataBase.countryInfo = require('./users.js')(mongoose);
dataBase.countries = require('./countries.js')(mongoose);

module.exports = dataBase;