/* global Sequelize, sequelize */

module.exports = () => {
    return sequelize.define('doctors', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        specialty_map: { type: Sequelize.STRING },
        specialty: { type: Sequelize.STRING },
        cn_specialty: { type: Sequelize.STRING },
        slug: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        cn_name: { type: Sequelize.STRING },
        links: { type: Sequelize.STRING(300) },
        gender: { type: Sequelize.STRING(1) },
        hospitals: { type: Sequelize.STRING(500) },
        cn_hospitals: { type: Sequelize.STRING(500) },
        qualifications: { type: Sequelize.STRING(500) },
        cn_qualifications: { type: Sequelize.STRING(500) },
        address: { type: Sequelize.STRING(500) },
        district: { type: Sequelize.STRING },
        cn_district: { type: Sequelize.STRING },
        type_of_practise: { type: Sequelize.STRING },
        cn_type_of_practise: { type: Sequelize.STRING },
        open_hours: { type: Sequelize.TEXT },
        'a&e_service': { type: Sequelize.BOOLEAN },
        fee: { type: Sequelize.STRING },
        language: { type: Sequelize.STRING },
        cn_language: { type: Sequelize.STRING },
        service_avalible: { type: Sequelize.TEXT },
        cn_service_avalible: { type: Sequelize.TEXT },
        service_outside: { type: Sequelize.STRING(1000) },
        med_proc_ops: { type: Sequelize.TEXT },
        phone: { type: Sequelize.STRING },
        fax: { type: Sequelize.STRING },
        pager: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },

    }, {
        timestamps: false
    });

}
