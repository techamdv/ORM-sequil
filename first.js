const express = require('express');
const bodyParser = require('body-parser')
const app = express();
// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
// const  User = require('./Models/user');
// const  Contact = require('./Models/contact');
// const { FORCE } = require('sequelize/lib/index-hints');
require('./Models/index');
var User = require('./controllers/userController');

app.use(bodyParser.json())


app.get('/' , function (req,res){
    res.send('hello world ')
})


app.post('/add' , User.addUser)
app.get('/users',User.getUser)
app.get('/user/:id',User.getSingleUser)
app.post('/save' , User.saveUser)
app.delete('/delete/:id' , User.deleteUser)
app.patch('/update/:id' , User.updateUser)
app.post('/addsep',User.addUserSpecified)
app.get('/rowquery',User.runRowQurey)
app.get('/onetoone',User.oneToOne)

// User.sync1();
// Contact.sync1();
console.log('The table for the User model was just (re)created!');

app.listen(3300,()=>{
    console.log('server started ');
})
//module.exports = sequelizenode 