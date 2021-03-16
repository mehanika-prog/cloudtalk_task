module.exports = (sequelize, DataTypes) => {

    const Ticket = sequelize.define('Ticket', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: DataTypes.STRING
        },
        timestamp: {
            type: DataTypes.DATE
        },
        source: {
            type: DataTypes.STRING
        },
        sourceId: {
            type: DataTypes.STRING
        },
        updatedByUserId: {
            type: DataTypes.INTEGER
        }

    }, {timestamps: false})

    return Ticket

}