const mongoose = require('mongoose');

const countriesSchema = mongoose.Schema({
    govWebSite: {
        type: String,
        required: true
    },
    countryName: {
        type: String,
        required: true
    },
    OfficialName: {
        type: String,
        required: true
    },
    territorialExtension: {
        type: Number,
        required: true
    },
    officialCurrency: {
        type: String,
        required: true
    },
    flagColors: {
        type: String,
        required: true
    },
    yearOfCreation: {
        type: Number,
        required: true
    }
}

);

module.exports = mongoose.model('Country', countriesSchema);