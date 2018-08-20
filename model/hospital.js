/* global Sequelize, sequelize */

module.exports = () => {
    return sequelize.define('hospitals', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.STRING },
        cn_name: { type: Sequelize.STRING },
        'a&e_service': { type: Sequelize.BOOLEAN },
        address: { type: Sequelize.STRING },
        cn_address: { type: Sequelize.STRING },
        cluster: { type: Sequelize.STRING },
        cn_cluster: { type: Sequelize.STRING }
    }, {
        timestamps: false
    });

}
