const router = require('express').Router();

//router.use('/', require('./swagger.json'));
router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello world']
    res.send('Hello World');
;});

router.use('/countries', require('./countries'));


module.exports = router;