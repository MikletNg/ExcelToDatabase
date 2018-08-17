/* global AWS, config, logger, fs, conn */
global.fs = require("fs");
global.config = require("./config/config.js");
var fun = require("./fun.js");

var mysql = require('mysql');
global.conn = mysql.createConnection(config.mysql);

global.AWS = require("aws-sdk");
AWS.config.update({ region: config.region }); // select deploy region
//AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: config.profile }); // ~/.aws/credentials

var log4js = require('log4js');
global.logger = log4js.getLogger();
logger.level = 'debug';

var promise = new Promise((resolve, reject) => {
        resolve(require("./query/surgeries.js")());
    })
    .then(data => { fun.rdsWrite('surgeries', data); })
    .then(() => { require("./query/hospitals.js")() })
    .then(data => { fun.rdsWrite('hospitals', data); })
    .then(() => { require("./query/doctors.js")() })
    .then(data => { fun.rdsWrite('doctors', data); })
    .then(() => { conn.end() });
    
// Promise.all([surgeries, hospitals, doctors]).then(() => {
//     conn.end();
// });

// Promise.all([surgeries, hospitals, doctors]).then((result) => {
//     require("./query/hktable.js")();
// }).then(data => {
//     fun.rdsWrite('hktable', data);
// }).then(() => { conn.end(); });

//fun.ddbWrite({ data: doctor_data, config: config.dynamodb.doctors_table_config });
//fun.ddbWrite({ data: surgery_data, config: config.dynamodb.surgery_table_config });
