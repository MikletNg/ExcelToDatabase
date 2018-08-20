/* global logger, fs, config, conn */
const xlsx = require('node-xlsx');
module.exports = () => {
    try {
        // create valid key name with orders
        const valid = ['Hospital', 'Specialty', 'Operation', 'Option', 'OrignalDescription', 'AnnualNumOfDischarges', 'AvgLenOfStay', 'Statistics', 'OpTheatrAndAssoMtrlCharges ', 'OtherHospitalCharges', 'AnaesthetistFees', 'DoctorFees', 'TotalCharges', 'Website', 'Date', 'Commentary', 'Description', 'Note', 'ReferenceNum', 'Dummy1', 'Dummy2', 'Dummy3'];
        let json = [];
        let data = xlsx.parse('../documents/DATA3_CLASSIFICATION_CODE/2b_hk table.xlsx');
        // Only have one sheet, so 0 index
        data = data[0].data;
        for (let row in data) {
            let n = {};
            for (let item in data[row]) {
                switch (valid[item]) {
                    case 'description':
                        n[valid[item]] = data[row][item].trim();
                        break;
                    default:
                        switch (data[row][item]) {
                            case '-':
                            case 'N/A':
                            case 'NA':
                                n[valid[item]] = null;
                                break;
                            default:
                                n[valid[item]] = data[row][item].toString();
                                break;
                        }
                        break;
                }
            }
            delete n.undefined;
            json.push(n);
        }
        json.splice(0, 1);
        // Export modified data
        fs.writeFileSync(`./json/hk_table.json`, JSON.stringify(json, null, 4));
        logger.info(`${Object.keys(json).length} rows of datas has been recorded.`);
        return json;

    }
    catch (err) {
        throw err;
    }
};
