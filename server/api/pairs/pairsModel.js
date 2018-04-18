
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pairsSchema = new Schema({
  asset_id_base: {type: String, unique: false,required: true},
  rates: [{
        time: {type: String},
        asset_id_quote: {type: String},
        rate: {type: Number}        
      }
    ]
});

module.exports = mongoose.model('Pair', pairsSchema);