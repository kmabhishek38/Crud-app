//log in
var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')


var schema = new mongoose.Schema({

    email: String,
    password: String
});

// Add passport-local-mongoose plugin to your schema
schema.plugin(passportLocalMongoose);
var Usersdb = mongoose.model('Usersdb', schema);

module.exports = Usersdb;



    //end