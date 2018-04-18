
var config = require('./server/config/config');
var app = require('./server/server');
var ctrl = require('./server/api/pairs/pairsController');
var logger = require('./server/util/logger');
const axios = require('axios');

app.listen(config.port, function(){
    axios.get("http://localhost:"+config.port+"/api/pairs/save").then((response) => {   });
});

logger.log('listening on http://localhost:' + config.port);