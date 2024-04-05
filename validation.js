const { check, validationResult } = require('express-validator');
const validator = {};

validator.userRules = () => {
    return [
        check("firstName", 'First name is required')
            .isLength({min: 2}),
        check("lastName", 'Last name is required')
            .isLength({min: 2}),
        check("email", 'Email is required')
            .isEmail()
            .normalizeEmail(),
        check("password", 'Password is required')
            .isLength({min: 6})
]
};

validator.countryRules = () => {
    return [
        check("govWebSite", 'Web Site is required')
            .isLength({ min: 3 }),
        check("countryName", 'Country Name is required')
            .isLength({ min: 3 }),
        check("OfficialName", 'Official Name is required')
            .isLength({ min: 4 }),
        check("territorialExtension", 'Extensions is required')
            .isNumeric(),
        check("officialCurrency", "Currency is required")
            .isLength({ min: 2 }),
        check("flagColors", "Colors is required")
            .isLength({ min: 6 }),
        check("yearOfCreation", 'Date of creation or foundation of the country is required (only numbers)')
            .isNumeric(), 
]
};

validator.checkUserData = (req, res, next) => {
   
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const validationErrors = [];
    errors.array().map(err => validationErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: validationErrors });
};

validator.checkCountryData = (req, res, next) => {
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const validationErrors = [];
    errors.array().map(err => validationErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: validationErrors });
};



module.exports = validator;