const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('countries').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      throw new Error('Must use a valid country id to find a country.');
    }
    const countryId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('countries').findOne({ _id: countryId });
    if (!result) {
      throw new Error('Country not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createCountry = async (req, res) => {
  //#swagger.tags=['Countries']
  const country = {
      govWebSite: req.body.govWebSite,
      countryName: req.body.countryName,
      OfficialName: req.body.OfficialName,
      territorialExtension: req.body.territorialExtension,
      officialCurrency: req.body.officialCurrency,
      flagColors: req.body.flagColors,
      yearOfCreation: req.body.yearOfCreation
  };
  const response = await mongodb.getDatabase().db().collection('countries').insertOne(country);
  if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the country.');
    }
  };

const updateCountry = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a country.');
  }
  const countryId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
  const country = {
      govWebSite: req.body.govWebSite,
      countryName: req.body.countryName,
      OfficialName: req.body.OfficialName,
      territorialExtension: req.body.territorialExtension,
      officialCurrency: req.body.officialCurrency,
      flagColors: req.body.flagColors,
      yearOfCreation: req.body.yearOfCreation

  };
  const response = await mongodb.getDatabase().db().collection('countries').replaceOne({ _id: countryId }, country);
        //console.log(response);
  console.log(response);
  if (response.modifiedCount > 0) {
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'Some error occurred while updating the country.');
  }
};


const deleteCountry = async (req, res) => {
  //#swagger.tags=['Countries']
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid country id to delete a country.');
  }
  const countryId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('countries').deleteOne({ _id: countryId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the country.');
  }
};
module.exports = {
  getAll,
  getSingle,
  createCountry,
  updateCountry,
  deleteCountry
};

