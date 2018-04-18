"use strict";
var mongoose = require('mongoose');
var logger = require('../../util/logger');
var Pair = require('./pairsModel');
const axios = require('axios');
var config = require('../../config/config');

module.exports = {
    post: (req, res) => {
        console.log("going to save");
        var newPair = new Pair({
            asset_id_base: req.body.asset_id_base,
            rates: req.body.rates
        });
        try {
            newPair.save().then((doc) => {
                logger.log('data saved!!');
                res.send(doc);                
            }, (e) => {
                res.status(400).send(e);
            });
        } catch (ex) {
            if (ex.errorCode) {
                return res.status(ex.errorCode).json({
                    message: ex.message
                });
            }
            return res.status(500).json({
                message: "An error ocurred while trying to save the pair"
            });
        }
    },
    saveData: (_data) => {
        
        var newPair = new Pair({
            asset_id_base: _data.asset_id_base,
            rates: _data.rates
        });
        try {
            newPair.save().then((doc) => {                          
                logger.log('data saved!!');
            }, (e) => {});
        } catch (ex) {
            console.log(ex);
            return 0;
        }
    },    
    getData: (req, res) => {
        //console.log("in save");
        var BTC = axios.get('https://rest.coinapi.io/v1/exchangerate/BTC?apikey=' + config.coinApiKey);
        var BNB = axios.get('https://rest.coinapi.io/v1/exchangerate/BNB?apikey=' + config.coinApiKey);
        var ETH = axios.get('https://rest.coinapi.io/v1/exchangerate/ETH?apikey=' + config.coinApiKey);
        var USDT = axios.get('https://rest.coinapi.io/v1/exchangerate/USDT?apikey=' + config.coinApiKey);                   
        
        try {
            Promise.all([BTC, BNB, ETH, USDT]).then(values => {                                
                var dat = values[0].data;                        
                module.exports.saveData(dat);                
                var dat = values[1].data;               
                module.exports.saveData(dat);
                var dat = values[2].data;            
                module.exports.saveData(dat);
                var dat = values[3].data;            
                module.exports.saveData(dat);            
            }).catch(function (err) {
                console.log(err);                
            });
            res.send({ message : "ok" });
        } catch (ex) {
            if (ex.errorCode) {
                return res.status(ex.errorCode).json({
                    message: ex.message
                });
            }
            return res.status(500).json({
                message: "An error ocurred while trying to save the pair"
            });
        }

    },
    get: (req, res) => {
        console.log(req.params.asset_id_base);
        switch (req.params.asset_id_base) {            
            case "BTC":            
                Pair.find({ asset_id_base: "BTC" }).then((pairs) => {
                    res.send({ pairs });
                }, (e) => {
                    if (e.errorCode) {
                        return res.status(e.errorCode).json({
                            message: e.message
                        });
                    }
                    return res.status(500).json({
                        message: "An error ocurred on the server"
                    });
                })
                break;
            case "BNB":
                Pair.find({ asset_id_base: "BTC" }).then((pairs) => {
                    res.send({ pairs });
                }, (e) => {
                    if (e.errorCode) {
                        return res.status(e.errorCode).json({
                            message: e.message
                        });
                    }
                    return res.status(500).json({
                        message: "An error ocurred on the server"
                    });
                })
                break;
            case "ETH":
                Pair.find({ asset_id_base: "BTC" }).then((pairs) => {
                    res.send({ pairs });
                }, (e) => {
                    if (e.errorCode) {
                        return res.status(e.errorCode).json({
                            message: e.message
                        });
                    }
                    return res.status(500).json({
                        message: "An error ocurred on the server"
                    });
                })
                break;
            case "USDT":
                Pair.find({ asset_id_base: "BTC" }).then((pairs) => {
                    res.send({ pairs });
                }, (e) => {
                    if (e.errorCode) {
                        return res.status(e.errorCode).json({
                            message: e.message
                        });
                    }
                    return res.status(500).json({
                        message: "An error ocurred on the server"
                    });
                })
                break;
            default:
        }
    },
}