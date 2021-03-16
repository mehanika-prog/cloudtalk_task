module.exports = (sequelize, DataTypes) => {

    const Contact = sequelize.define('Contact', {

        vid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        createdate: {
            type: DataTypes.DATE
        }

    }, {timestamps: false})

    return Contact

}