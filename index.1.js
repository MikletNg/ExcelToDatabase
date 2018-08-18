/* global config, logger, fs, conn, Sequelize, sequelize */
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
    pool: { max: 5, idle: 30 }
});

let hospitals = require("./query/hospitals.js")();
let surgeries = require("./query/surgeries.js")();
let doctors = require("./query/doctors.js")();
let hk_table = require("./query/hk_table.js")();
let sg_table = require("./query/sg_table.js")();

const Hospital = require("./model/hospital.js")();
const Surgery = require("./model/surgery.js")();
const Doctor = require("./model/doctor.js")();
const HkTable = require("./model/hk_table.js")();

// sequelize.sync()
    // .then(() => {
    //     for (let row in hospitals) {
    //         Hospital.create(hospitals[row]);
    //     }
    // })
    // .then(() => {
    //     for (let row in surgeries) {
    //         Surgery.create(surgeries[row]);
    //     }
    // })
    // .then(() => {
    //     for (let row in hk_table) {
    //         HkTable.create(hk_table[row]);
    //     }
    // })
    // .then(() => {
    //     for (let row in doctors) {
    //         Doctor.create(doctors[row]);
    //     }
    // })
    // .then(() => { logger.info("All insert completed!") });




// require("./query/hk_table.js")()
