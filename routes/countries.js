const express = require('express');
const router = express.Router();

const countriesController = require('../controllers/countries');
const validation = require('../middleware/validate');

router.get('/', countriesController.getAll);

router.get('/:id', countriesController.getSingle);

router.post('/', validation.saveCountry, countriesController.createCountry);

router.put('/:id', validation.saveCountry, countriesController.updateCountry);

router.delete('/:id', countriesController.deleteCountry);

module.exports = router;