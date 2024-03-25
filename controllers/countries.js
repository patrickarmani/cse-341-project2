const mongodb = require('../data/database');
const ObjectId =  require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('countries').find();
    result.toArray().then((countries) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(countries);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('countries').find({ _id: countryId });
    result.toArray().then((countries) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(countries[0]);
    });
};

const createCountry = async (req, res) => {
    //#swagger.tags=['Users']
    const country = {
        govWebSite: req.body.govwebsite,
        countryName: req.body.countryname,
        OfficialName: req.body.name,
        territorialExtension: req.body.territorialextension,
        officialCurrency: req.body.officialcurrency,
        flagColors: req.body.flagcolors,
        yearOfCreation: req.body.yearOfcreation
    };
    const response = await mongodb.getDatabase().db().collection('countries').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createCountry
};