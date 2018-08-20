/* global logger, fs */
const xlsx = require('node-xlsx');
module.exports = () => {
    try {
        // create valid key name with orders
        const valid = ['BodyPart', 'ProcedureDescription', 'TospCode', 'TospTable', 'TospDescription', 'HospitalType', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'Code', 'BodyPartClass', 'OrganClass', 'OperationMasterMapping', 'Options', 'dummy', 'dummy', 'Hospital', 'Specialty', 'Operation', 'Option', 'OrignalDescription', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'Commentary', 'Description', 'Note', 'ReferenceNum', 'Dummy1', 'Dummy2', 'Dummy3'];
        let json = [];
        let data = xlsx.parse('../documents/DATA3_CLASSIFICATION_CODE/2a_singapore learning files.xlsx');
        // Only have one sheet, so 0 index
        data = data[0].data;
        for (let row in data) {
            let n = {};
            for (let item in data[row]) {

                n[valid[item]] = data[row][item];
            }
            delete n.dummy;
            json.push(n);
        }
        json.splice(0, 1);
        // Export modified datafs.writeFileSync(`./json/sg_table.json`, JSON.stringify(json, null, 4));
        fs.writeFileSync(`./json/sg_table.json`, JSON.stringify(json, null, 4));
        logger.info(`${Object.keys(json).length} rows of datas has been recorded.`);
        return json;

    }
    catch (err) {
        throw err;
    }
};
