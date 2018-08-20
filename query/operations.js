/* global logger, fs */
const xlsx = require('node-xlsx');

module.exports = () => {
    try {
        // create valid key name with orders
        const valid = ['Operation', 'Specialty', 'ChineseOperation', 'ChineseSpecialty', 'PartOfBody', 'Organ'];
        let json = [];
        let data = xlsx.parse('../documents/DATA3_CLASSIFICATION_CODE/2c_general info.xlsx');
        // Only have one sheet, so 0 index
        data = data[0].data;
        //Append row A to other row as key
        for (let row in data) {
            let n = {};
            for (let item in data[row]) {
                n[valid[item]] = data[row][item];
            }
            if (n.Operation) {
                json.push(n);
            }
        }
        //Remove row A (those useless key name)
        json.splice(0, 1);
        // Export modified data
        fs.writeFileSync(`./json/operations.json`, JSON.stringify(json, null, 4));
        logger.info(`${Object.keys(json).length} rows of datas has been recorded.`);
        return json;
    }
    catch (err) {
        throw err;
    }
};
