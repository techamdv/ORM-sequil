const { Sequelize,DataTypes,Model } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
//const sequelize = new Sequelize('sqlite::memory:');


// Passing parameters separately (other dialects)
const sequelize = new Sequelize('studentdb', 'root', '7570', {
  host: 'localhost',
  logging:false,
  dialect:  'mysql'  // | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});


// TEST THE CONNECGTION
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } 
catch (error) { 
    console.error('Unable to connect to the database:', error);
  }


db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Contact  = require('./contact')(sequelize,DataTypes);
db.User = require('./user')(sequelize,DataTypes,Model);
db.User.hasOne(db.Contact ); // A HasOne B
db.Contact.belongsTo(db.User); // A BelongsTo B
//console.log("my result for user : "+ typeof(db.User));
db.sequelize.sync({force:true});
module.exports  = db ;