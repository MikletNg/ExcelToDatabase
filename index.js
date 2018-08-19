/* global config, logger, fs, Sequelize, sequelize */
global.fs = require("fs");
global.config = require("./config/config.js");

let log4js = require('log4js');
global.logger = log4js.getLogger();
logger.level = 'debug';

global.Sequelize = require('sequelize');
global.sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    logging: false,
    pool: { max: 5, min: 0, idle: 20000, acquire: 20000 } // !!!IMPORTANT !!! //
});

let hospitals = require("./query/hospitals.js")();
let operations = require("./query/operations.js")();
let doctors = require("./query/doctors.js")();
let hk_table = require("./query/hk_table.js")();
let sg_table = require("./query/sg_table.js")();

const Hospital = require("./model/hospital.js")();
const Operation = require("./model/operation.js")();
const Doctor = require("./model/doctor.js")();
const HKTable = require("./model/hk_table.js")();
const SGTable = require("./model/sg_table.js")();


sequelize.sync()
    .then(() => {
        for (let row in hospitals) {
            Hospital.create(hospitals[row]);
        }
    })
    .then(() => {
        for (let row in operations) {
            Operation.create(operations[row]);
        }
    })
    .then(() => {
        for (let row in doctors) {
            Doctor.create(doctors[row]);
        }
    })
    .then(() => {
        for (let row in hk_table) {
            HKTable.create(hk_table[row]);
        }
    })
    .then(() => {
        for (let row in sg_table) {
            SGTable.create(sg_table[row]);
        }
    })
    .then(() => { logger.info("All insert completed!") });
