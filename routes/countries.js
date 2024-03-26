const express = require('express');
const router = express.Router();

const countriesController = require('../controllers/countries');

router.get('/', countriesController.getAll);

router.get('/:id', countriesController.getSingle);

router.post('/', countriesController.createCountry);

module.exports = router;