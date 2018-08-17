/* global logger, fs, config, conn */
const xlsx = require('node-xlsx');
var ProgressBar = require('progress');
var getId = (tableName, text, match) => {
    try {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM `" + tableName + "` WHERE MATCH (" + match + ") AGAINST (\"" + text + "\")";
            conn.query(sql, (err, result, fields) => {
                if (err) { console.log(sql); throw err }
                if (result.length !== 0) {
                    resolve(result[0].id);
                }
                else {
                    resolve(null);
                }

            });
        });
    }
    catch (e) {
        throw e;
    }
};

module.exports = () => {
    try {
        return new Promise((resolve, reject) => {
            // create valid key name with orders
            const valid = ['hospital', 'type', 'surgery', 'options', 'description', 'annual_no_discharges', 'avg_length_stay', 'statistics', 'ops_charges', 'other_charges', 'anaesthetist_fee', 'doctor_fee', 'total_charges', 'links', 'date', 'dummy', 'dummy'];
            var json = [],
                requestId;
            var data = xlsx.parse('../documents/DATA3_CLASSIFICATION_CODE/2b_hk table.xlsx');
            fs.writeFileSync(`./json/hktable_raw.json`, JSON.stringify(data, null, 4));
            // Only have one sheet, so 0 index
            data = data[0].data;
            var bar = new ProgressBar(':bar', { total: data.length });
            for (let row in data) {
                let n = {};
                for (let item in data[row]) {
                    switch (valid[item]) {
                        case 'description':
                            n[valid[item]] = data[row][item].trim();
                            break;
                        case 'surgery':
                            let s = data[row][item] || data[row][4];
                            requestId = getId('surgeries', s, '`slug`,`surgery`,`type`').then(result => {
                                n.surgery_id = result;
                            });
                            n[valid[item]] = s;
                            break;
                        case 'hospital':
                            requestId = getId('hospitals', data[row][item], '`slug`,`name`,`cn_name`').then(result => {
                                n.hospital_id = result;

                            });
                            n[valid[item]] = data[row][item];
                            break;
                        default:
                            n[valid[item]] = data[row][item].toString();
                            break;
                    }
                }
                var requestNext = requestId.then(() => {
                    bar.tick();
                    delete n.undefined;
                    delete n.type;
                    delete n.surgery;
                    delete n.hospital;
                    if (n.hospital_id) {
                        json.push(n);
                        if (row === data.length - 1) Promise.resolve();
                    }
                });
            }
            requestNext.then(() => {
                var searchSurgeryID = (description) => {
                    for (let row in json) {
                        if (description === json[row].description) {
                            return json[row].surgery_id;
                        }
                    }
                };
                for (let row in json) {
                    if (!json[row].surgery_id) {
                        json[row].surgery_id = searchSurgeryID(json[row].description);
                    }
                }
                json.splice(0, 1);
                // Export modified data
                fs.writeFileSync(`./json/hktable.json`, JSON.stringify(json, null, 4));
                logger.info(`${Object.keys(json).length} rows of datas has been recorded.`);
                return resolve(json);
            });
        });
    }
    catch (err) {
        throw err;
    }
};
