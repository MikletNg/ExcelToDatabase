/* global Sequelize, sequelize */

module.exports = () => {
    return sequelize.define('sg_table', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        body_part: { type: Sequelize.STRING },
        procedure: { type: Sequelize.STRING },
        tosp_code: { type: Sequelize.STRING },
        tosp_table: { type: Sequelize.STRING },
        tosp_description: { type: Sequelize.STRING },
        hospital_type: { type: Sequelize.STRING },
        dummy1: { type: Sequelize.STRING },
        dummy2: { type: Sequelize.STRING },
        dummy3: { type: Sequelize.STRING },
        dummy4: { type: Sequelize.STRING },
        dummy5: { type: Sequelize.STRING },
        dummy6: { type: Sequelize.STRING },
        dummy7: { type: Sequelize.STRING },
        code: { type: Sequelize.STRING },
        body_part_class: { type: Sequelize.STRING },
        organ_class: { type: Sequelize.STRING },
        operation: { type: Sequelize.STRING },
        options: { type: Sequelize.STRING },
        hospital: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        operation_indexed: { type: Sequelize.STRING },
        options_indexed: { type: Sequelize.STRING },
        original_description: { type: Sequelize.STRING },
        dummy8: { type: Sequelize.STRING },
        dummy9: { type: Sequelize.STRING },
        dummy10: { type: Sequelize.STRING },
        dummy11: { type: Sequelize.STRING },
        dummy12: { type: Sequelize.STRING },
        dummy13: { type: Sequelize.STRING },
        dummy14: { type: Sequelize.STRING },
        dummy15: { type: Sequelize.STRING },
        dummy16: { type: Sequelize.STRING },
        dummy17: { type: Sequelize.STRING },
        commentary: { type: Sequelize.STRING }
    }, {
        timestamps: false
    });

}
