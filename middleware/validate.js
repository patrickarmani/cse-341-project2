const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    password: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveCountry = (req, res, next) => {
  const validationRule = {
    govWebSite: 'required|string',
    countryName: 'required|string',
    OfficialName: 'required|string',
    territorialExtension: 'required|string',
    officialCurrency: 'required|string',
    flagColors: 'required|string',
    yearOfCreation: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser, saveCountry
};
