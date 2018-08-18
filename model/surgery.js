/* global Sequelize, sequelize */

module.exports = () => {
    return sequelize.define('surgeries', {
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        slug: { type: Sequelize.STRING },
        surgery: { type: Sequelize.STRING },
        cn_surgery: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        cn_type: { type: Sequelize.STRING },
        parent_part: { type: Sequelize.STRING },
        part: { type: Sequelize.STRING }
    }, {
        timestamps: false
    });

}
