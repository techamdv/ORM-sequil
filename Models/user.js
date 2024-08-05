//const { DataTypes,Model } = require('sequelize');
// const sequelize = require('./index') //new Sequelize('sqlite::memory:');

//const { useInflection } = require("sequelize");


// const { Sequelize, DataTypes, Model } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize,DataTypes,Model)=>{


class User extends Model {}

    User.init(
      {
        // Model attributes are defined here
       
        firstName: {
          type: DataTypes.STRING,
          set(value){
            this.setDataValue('firstName','mr.' + value);
          },
          get() {
            const rawValue = this.getDataValue('firstName');
            return rawValue ? "Dr. " + rawValue.toUpperCase() : null;
          },
        },
        lastName: {
          type: DataTypes.STRING,
          defaultValue : "No name",
          //allowNull : false
        },
        age: {
          type: DataTypes.INTEGER,
          //allowNull : true,
          defaultValue : 0,
          // allowNull defaults to true
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
        updatedAt : false
      },
    );

// the defined model is the class itself
console.log(User === sequelize.models.User); // true
return User;
}
