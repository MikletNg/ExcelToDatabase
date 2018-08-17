/* global logger, fs */
const xlsx = require('node-xlsx');
const slug = require('slug');

module.exports = () => {
    try {
        // create valid key name with orders
        const valid = ['name', 'cn_name', 'links', 'specialty_map', 'specialty', 'gender', 'qualifications', 'address', 'district', 'type_of_practise', 'open_hours', 'a&e_service', 'fee', 'language', 'service_avalible', 'service_outside', 'med_proc_ops', 'hospitals', 'phone', 'fax', 'pager', 'email', 'cn_specialty', 'dummy', 'cn_qualifications', 'cn_address', 'cn_district', 'cn_type_of_practise', 'dummy', 'dummy', 'dummy', 'cn_language', 'cn_service_avalible', 'cn_service_outside', 'cn_hospitals', 'dummy', 'dummy', 'dummy', 'dummy'];
        var json = [];
        var data = xlsx.parse('../documents/DATA2_DOCTORS/hkdoctor.xlsx');
        // Only have one sheet, so 0 index
        data = data[0].data;
        // Append row A to other row as key
        for (let row in data) {
            let n = {};
            for (let item in data[row]) {
                switch (valid[item]) {
                    case 'qualifications':
                    case 'cn_qualifications':
                    case 'language':
                    case 'cn_language':
                    case 'address':
                    case 'service_avalible':
                    case 'cn_service_avalible':
                    case 'service_outside':
                    case 'cn_service_outside':
                    case 'med_proc_ops':
                        n[valid[item]] = data[row][item].replace(/(?:\r\n\t\r\n|\r\n|\r|\n|\t)/g, ',');
                        break;
                    case 'a&e_service':
                        n[valid[item]] = data[row][item] === "Y" ? true : false;
                        break;
                    case 'fee':
                        n[valid[item]] = data[row][item].toString();
                        break;
                    case 'open_hours':
                        let x = data[row][item].replace(/(?:\r\n\t\r\n|\r\n|\r|\n|\t)/g, ',').split(',');
                        for (let i in x) {
                            x[i] = x[i].trim();
                        }
                        n[valid[item]] = x.join(', ');
                        break;
                    case 'hospitals':
                    case 'cn_hospitals':
                        n[valid[item]] = data[row][item].replace(/(?:\r\n\t\r\n|\r\n|\r|\n|\t)/g, ',').split(/(?:;|，|；)|\,\s?(?![^\(]*\))/g);
                        // var a = data[row][item].replace(/(?:\r\n\t\r\n|\r\n|\r|\n|\t)/g, ',').split(/(?:;|，|；)|\,\s?(?![^\(]*\))/g);
                        // for (let b in a) {
                        //     if (valid[item] == 'hospitals') {
                        //         hospitals.eng[a[b]] = a[b].trim();
                        //     }
                        //     else {
                        //         hospitals.cn[a[b]] = a[b].trim();
                        //     }
                        // }
                    default:
                        n[valid[item]] = data[row][item];
                        break;
                }
                if (typeof n[valid[item]] === 'object') {
                    for (let x in n[valid[item]]) {
                        n[valid[item]][x] = n[valid[item]][x].trim();
                    }
                    n[valid[item]] = n[valid[item]].filter(Boolean);
                }
            }
            // delete dummy row
            delete n.dummy;
            //delete n.hospitals;
            //delete n.cn_hospitals;
            // Remove error row
            if (n.name && n.cn_name && (n.gender === 'F' || n.gender === 'M')) {
                //n.doctor_id = parseInt(row);
                n.slug = slug(n.name);
                json.push(n);
            }
        }
        // Remove row A (those useless key name)
        json.splice(0, 1);
        // Export modified data
        //fs.writeFileSync(`./json/${config.dynamodb.doctors_table_config.TableName}_raw.json`, JSON.stringify(data, null, 4));
        fs.writeFileSync(`./json/doctors.json`, JSON.stringify(json, null, 4));
        logger.info(`${Object.keys(json).length} rows of datas has been recorded.`);
        return json;
    }
    catch (err) {
        throw err;
    }
};
