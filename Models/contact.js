module.exports = (sequelize,DataTypes)=>{

const contact = sequelize.define 
('contacts',
    {
        village :{
            type : DataTypes.STRING,
        },
        post : {
            type : DataTypes.STRING,
        },
        zip:{
            type : DataTypes.INTEGER,
        }
    },
    {
        tableName : 'contacts',
        createdAt :false,
        updatedAt :false,

    }
)
return contact;
// function sync1(cmd){
//     contact.sync({ force: true });
//   }
}
//module.exports = {contact,sync1}
