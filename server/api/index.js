var router = require('express').Router();
router.use('/pairs', require('./pairs/pairsRoutes'));
module.exports = router;