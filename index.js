/* global AWS, config, logger, fs, conn */
global.fs = require("fs");
global.config = require("./config/config.js");
let fun = require("./fun.js");

let mysql = require('mysql');
global.conn = mysql.createConnection(config.mysql);

global.AWS = require("aws-sdk");
AWS.config.update({ region: config.region }); // select deploy region
//AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: config.profile }); // ~/.aws/credentials

let log4js = require('log4js');
global.logger = log4js.getLogger();
logger.level = 'debug';

// let surgeries = require("./query/surgeries.js")();
// let hospitals = require("./query/hospitals.js")();
// let doctors = require("./query/doctors.js")();

require("./query/hk_table.js")()
    .then(data => fun.rdsWrite('hk_table', data))
    .then(() => { conn.end() });
