/* global AWS, config, logger, fs, conn */
const ProgressBar = require('progress');
let cb = (err, result, fields) => {
    if (err) throw err;
};

module.exports = {
    ddbWrite: (info) => {
        let ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });
        const tableName = info.config.TableName;
        logger.info(`Check table: ${tableName}`);
        ddb.describeTable({ TableName: tableName }).promise()
            .then((data) => {
                logger.info("Table already exists!");
                return { isExist: true };
            }).catch((err) => {
                logger.info("Table not exists, create now.");
                ddb.createTable(info.config, function(err, data) {
                    if (err) logger.error(err, err.stack);
                    else logger.info(`Table ${tableName} successfully created!`);
                });
                return { isExist: false };
            }).then((cb) => {
                let documentClient = new AWS.DynamoDB.DocumentClient();
                let params = { RequestItems: {} };

                let start = () => {
                    logger.info("Start write data to dynamoDB.");
                    for (let row in info.data) {
                        params = {
                            TableName: tableName,
                            Item: info.data[row]
                        };
                        documentClient.put(params, function(err, data) {
                            if (err) logger.error(err);
                            else logger.info(row + data);
                        });
                    }
                };
                // let start = () => {
                //     for (let row in info.data) {
                //         item = {
                //             PutRequest: {
                //                 Item: info.data[row],
                //                 ReturnValues: "ALL_OLD"
                //             }
                //         };
                //         itemsArray.push(item);
                //         params.RequestItems[tableName] = itemsArray;
                //         if (row % 25 === 0) {
                //             documentClient.batchWrite(params, (err, data) => { err && logger.error(err); });
                //             itemsArray = [];
                //         }
                //     }
                //     if (itemsArray.length > 0 && itemsArray.length !== 25) documentClient.batchWrite(params, (err, data) => { err && logger.error(err); });
                // };
                if (cb.isExist) {
                    // if table already exist start write data now
                    start();
                }
                else {
                    // if not, start after 6 sec wait the table is ready
                    setTimeout(() => { start() }, 6000);
                }
            });
    },
    rdsWrite: async(tableName, data) => {
        try {
            let sql = fs.readFileSync(`./sql/${tableName}.sql`).toString();
            conn.query("DROP TABLE IF EXISTS `" + tableName + "` CASCADE;", cb);
            conn.query(sql, cb);
            logger.info(`Now insert data into Table:${tableName}. It may take a while.`);
            var bar = new ProgressBar(':bar', { total: data.length });
            for (let item in data) {
                conn.query(`INSERT INTO ${tableName} SET ?`, data[item], (err, result, fields) => {
                    if (err) throw err;
                    bar.tick();
                    if (bar.complete) {
                        logger.info(`Table:[${tableName}] insert complete!`);
                        return Promise.resolve();
                    }
                });
            }
        }
        catch (err) {
            throw err;
        }
    }
};
