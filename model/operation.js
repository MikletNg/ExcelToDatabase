/* global Sequelize, sequelize */

module.exports = () => {
    return sequelize.define('Operation', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        Operation: { type: Sequelize.STRING },
        ChineseOperation: { type: Sequelize.STRING },
        Specialty: { type: Sequelize.STRING },
        ChineseSpecialty: { type: Sequelize.STRING },
        PartOfBody: { type: Sequelize.STRING },
        Organ: { type: Sequelize.STRING }
    }, {
        timestamps: false
    });

}
