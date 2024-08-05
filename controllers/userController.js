const { where,sequelize } = require('sequelize');
var db = require('../Models');
const { QueryTypes } = require('sequelize');
var User = db.User;
var Contact = db.Contact;

// simple insertion of user data
var addUser = async (req, res) => {

    // 1. FIRST METHOD BY BUILD & SAVE 
    // const jane = User.build({ firstName: 'manu' , lastName : 'verma' ,age : 21 });
    // jane.save();

    // 2. SECOND CREATE METHOD 
    var jane ;
    try
    {
    await User.create({ firstName: 'new', lastName: 'kumar', age: 31 });
    }
    catch(err)
    {
        
        console.log("my msg  " + err.message)
    }

    // 3. THIRD create, SET AND SAVE METHOD  - UPDATE METHOD
    // jane.set({
    //      firstName: 'devvart' , 
    //      lastName : 'verma' ,
    // });
    //await jane.save();

    // 4. forth CREATE UPDATE SAVE -- UPDATE METHOD
    // jane.update({
    //     age: 26
    // })
    // await jane.save();

    // 5. fifth method  DELETE ENTRY
    //jane.destroy();



    //console.log(jane instanceof User); // true
    //console.log(jane.name); // "Jane"
    console.log('Jane was saved to the database!');
    //console.log(jane.toJSON()); // This is good!
    res.status(200).json(message =  "name is not valid ")

}

// GET USER 
// var getUser = async (req, res) => {
//     const data = await User.findAll({});
//     // console.log(jane instanceof User); // true
//     // console.log(jane.name); // "Jane"
//     console.log('Jane was FETCH FROM the database!');
//     // console.log(jane.toJSON()); // This is good!
//     res.status(200).json({ data })
// }

// try methods 
var getUser = async (req, res) => {
    const { count, rows } = await User.findAndCountAll({    })
    // console.log(jane instanceof User); // true
    // console.log(jane.name); // "Jane"
    console.log('this other sql try' );
    
    // console.log(jane.toJSON()); // This is good!
    res.status(200).json({ data:rows,count:count })
}
// fetch single user data
var getSingleUser = async (req, res) => {
    const data = await User.findOne({
        where:
        {
            id: req.params.id
        }
    });
    console.log('single user with id ' + req.params.id + ' FETCH FROM the database!');
    res.status(200).json({ data })
}

// ADD A USER TO YOUR DB
var saveUser = async (req, res) => {
    var newData = req.body
    if (newData.lenth > 1) {
        console.log(newData);
        const newUser = await User.bulkCreate(newData);
        res.status(200).json({ newData })
    }
    else {
        console.log(newData);
        const newUser = await User.create(newData);
        res.status(200).json({ newData })
    }
}

// DELETE USER BY ID
var deleteUser = async (req, res) => {
    const { id } = req.params
    if (id >= 1) {
        const newUser = await User.destroy({
            where:
            {
                id: id
            }
        });
        res.status(200).json({ newUser })
    }
    else {
        console.log(id, "id is not exist");
        res.status(200).json({ message: "failed" })
    }
}

// UPDATE USER 
var updateUser = async (req, res) => {
    const { id } = req.params
    const data = req.body
    var updatedData = await User.update(
        data,
        {
            where: {
                id: id
            }
        }
    )
    res.status(200).json({ status: "success", data: updatedData })
}
// INSERT data to specific Field
var addUserSpecified = async (req, res) => {
    //const { id } = req.params
    const data = req.body
    var Data = await User.create(data,{ fields : ["firstName"]} )
    res.status(200).json({ status: "success", data: Data })
}

var runRowQurey = async (req, res) => {
    //const { id } = req.params
    const users = await db.sequelize.query('select firstName, lastName, age, village, post, zip from users,contacts where users.id=contacts.id;', {
        type: QueryTypes.SELECT,
        model:User,
        mapToModel : true,
        //model:Contact
        //replacements : {date: '2024-07-07%',age:22}
    });
    // const data = req.body
    // var Data = await User.create(data,{ fields : ["firstName"]} )
    console.log('row query run !!!!!!!!!');
    res.status(200).json({ status: "success", data: users })
}

var oneToOne = async (req, res) => {
    const { count, rows } = await User.findAndCountAll({  
        include : Contact
      })
    // console.log(jane instanceof User); // true
    // console.log(jane.name); // "Jane"
    console.log('this other sql try' );
    
    // console.log(jane.toJSON()); // This is good!
    res.status(200).json({ data:rows,count:count })


    //const { id } = req.params
    // const user = await User.create({firstName:"sachin",lastName:"gupta",age:25});
    // if (user && user.id)
    // {
    //     await Contact.create({userId:user.id,village:"vasant vihar",post:"narayanpur",zip:857841});

    // }
    // else
    // {
    //     console.log("data is not recognise yet");
    // }
  
    // const data = req.body
    // var Data = await User.create(data,{ fields : ["firstName"]} )
    //console.log('one to one run !!!!!!!!!');
   // res.status(200).json({ status: "success", data: user })
}

module.exports = {
    addUser,
    getUser,
    getSingleUser,
    saveUser,
    deleteUser,
    updateUser,
    addUserSpecified,
    runRowQurey,
    oneToOne
    
}