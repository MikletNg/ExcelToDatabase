/* global logger, fs */
const xlsx = require('node-xlsx');
const slug = require('slug');

module.exports = () => {
    try {
        // create valid key name with orders
        const public_h_valid = ['dummy', 'cluster', 'name', 'a&e_service', 'address', 'cn_cluster', 'cn_name', 'dummy', 'cn_address', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy', 'dummy'];
        const private_h_valid = ['name', 'address', 'dummy', 'dummy', 'dummy', 'dummy', 'cn_name', 'cn_address', 'dummy', 'dummy', 'dummy', 'dummy', ];
        let json = [],
            private_h = [];

        let public_h_raw = xlsx.parse('../documents/public_hospitals.xlsx');
        let public_h = public_h_raw[0].data;
        for (let row in public_h) {
            let n = {};
            for (let item in public_h[row]) {
                switch (public_h_valid[item]) {
                    case 'a&e_service':
                        n[public_h_valid[item]] = public_h[row][item] === 'Yes' ? true : false;
                        break;
                    default:
                        n[public_h_valid[item]] = public_h[row][item];
                        break;
                }
            }
            delete n.dummy;
            if (n.name && row != 0) {
                n.slug = slug(n.name);
                json.push(n);
            }
        }

        let private_h_raw = xlsx.parse('../documents/private_hospitals.xlsx');
        let private_h_cn = private_h_raw[0].data;
        let private_h_eng = private_h_raw[1].data;
        for (let row in private_h_cn) {
            private_h.push(private_h_cn[row].concat(private_h_eng[row]));
            let n = {};
            for (let item in private_h[row]) {
                switch (private_h_valid[item]) {
                    case 'cn_name':
                    case 'cn_address':
                        n[private_h_valid[item]] = private_h[row][item].replace(/\s/g, '');
                        break;
                    default:
                        n[private_h_valid[item]] = private_h[row][item];
                        break;
                }
            }
            delete n.dummy;
            if (n.name && row != 0) {
                n.slug = slug(n.name);
                n.cluster = "Private Hospital";
                n.cn_cluster = "私立醫院";
                json.push(n);
            }
        }

        // Export modified data
        //fs.writeFileSync(`./json/private.json`, JSON.stringify(private_h, null, 4));
        //fs.writeFileSync(`./json/public.json`, JSON.stringify(public_h, null, 4));
        fs.writeFileSync(`./json/hospitals.json`, JSON.stringify(json, null, 4));
        logger.info(`${Object.keys(json).length} rows of datas has been recorded.`);
        return json;
    }
    catch (err) {
        throw err;
    }
};
