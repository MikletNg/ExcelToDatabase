/* global logger, fs */
const xlsx = require('node-xlsx');
module.exports = () => {
    try {
        // create valid key name with orders
        const valid = ['body_part', 'procedure', 'tosp_code', 'tosp_table', 'tosp_description', 'hospital_type', 'dummy1', 'dummy2', 'dummy3', 'dummy4', 'dummy5', 'dummy6', 'dummy7', 'code', 'body_part_class', 'organ_class', 'operation', 'options', 'dummy', 'dummy', 'hospital', 'type', 'operation_indexed', 'options_indexed', 'original_description', 'dummy8', 'dummy9', 'dummy10', 'dummy11', 'dummy12', 'dummy13', 'dummy14', 'dummy15', 'dummy16', 'dummy17', 'commentary', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy'];
        let json = [];
        let data = xlsx.parse('../documents/DATA3_CLASSIFICATION_CODE/2a_singapore learning files.xlsx');
        // Only have one sheet, so 0 index
        data = data[0].data;
        fs.writeFileSync(`./json/sg_table_raw.json`, JSON.stringify(data, null, 4));
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
