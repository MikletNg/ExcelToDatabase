/* global Sequelize, sequelize */

module.exports = () => {
    return sequelize.define('hk_table', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        hospital: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        surgery: { type: Sequelize.STRING },
        options: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        annual_no_discharges: { type: Sequelize.STRING },
        avg_length_stay: { type: Sequelize.STRING },
        statistics: { type: Sequelize.STRING },
        ops_charges: { type: Sequelize.STRING },
        other_charges: { type: Sequelize.STRING },
        anaesthetist_fee: { type: Sequelize.STRING },
        doctor_fee: { type: Sequelize.STRING },
        total_charges: { type: Sequelize.STRING },
        links: { type: Sequelize.STRING },
        date: { type: Sequelize.STRING }
    }, {
        timestamps: false
    });

}
