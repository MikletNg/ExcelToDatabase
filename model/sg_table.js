/* global Sequelize, sequelize */

module.exports = () => {
    return sequelize.define('sg_table', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        BodyPart: { type: Sequelize.STRING },
        ProcedureDescription: { type: Sequelize.STRING },
        TospCode: { type: Sequelize.STRING },
        TospTable: { type: Sequelize.STRING },
        TospDescription: { type: Sequelize.STRING },
        HospitalType: { type: Sequelize.STRING },
        Code: { type: Sequelize.STRING },
        BodyPartClass: { type: Sequelize.STRING },
        OrganClass: { type: Sequelize.STRING },
        OperationMasterMapping: { type: Sequelize.STRING },
        Options: { type: Sequelize.STRING },
        Hospital: { type: Sequelize.STRING },
        Specialty: { type: Sequelize.STRING },
        Operation: { type: Sequelize.STRING },
        Option: { type: Sequelize.STRING },
        OrignalDescription: { type: Sequelize.STRING },
        Commentary: { type: Sequelize.STRING },
        Description: { type: Sequelize.STRING },
        Note: { type: Sequelize.STRING },
        ReferenceNum: { type: Sequelize.STRING },
        Dummy1: { type: Sequelize.STRING },
        Dummy2: { type: Sequelize.STRING },
        Dummy3: { type: Sequelize.STRING }
    }, {
        timestamps: false
    });

}
