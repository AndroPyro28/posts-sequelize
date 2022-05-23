module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false // it is like required: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: "cascade"
        })
        Users.hasMany(models.Likes, {
            onDelete: "cascade"
        })
        Users.hasMany(models.Comments, {
            onDelete: "cascade"
        })
    }

    return Users;
}