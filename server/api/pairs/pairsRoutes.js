var router = require('express').Router();
var logger = require('../../util/logger');
const axios = require('axios');
var controller = require('./pairsController');


//router.param('asset_id', controller.params);

router.route('/save')
    .get(controller.getData)        

router.route('/:asset_id_base')
    .get(controller.get)


module.exports = router;



