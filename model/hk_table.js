/* global Sequelize, sequelize */

module.exports = () => {
    return sequelize.define('hk_table', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        Hospital: { type: Sequelize.STRING },
        Specialty: { type: Sequelize.STRING },
        Operation: { type: Sequelize.STRING },
        Option: { type: Sequelize.STRING },
        OrignalDescription: { type: Sequelize.STRING },
        AnnualNumOfDischarges: { type: Sequelize.STRING },
        AvgLenOfStay: { type: Sequelize.STRING },
        Statistics: { type: Sequelize.STRING },
        OpTheatrAndAssoMtrlCharges: { type: Sequelize.STRING },
        OtherHospitalCharges: { type: Sequelize.STRING },
        AnaesthetistFees: { type: Sequelize.STRING },
        DoctorFees: { type: Sequelize.STRING },
        TotalCharges: { type: Sequelize.STRING },
        Website: { type: Sequelize.STRING },
        'Date': { type: Sequelize.STRING },
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
