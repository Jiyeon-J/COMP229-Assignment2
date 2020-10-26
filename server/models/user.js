let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
    username: 
    {   type: String,
        default: "",
        trim: true,
        required: 'username is required'
    },

    /*passworde: 
    {   type: String,
        default: "",
        trim: true,
        required: 'password is required'
    }*/

    email: 
    {   type: String,
        default: "",
        trim: true,
        required: 'email address is required'
    },
    displayName:
    {   type: String,
        default: "",
        trim: true,
        required: 'display Name is required'
    }, 
    created:
    {
        type: Date,
        default: Date.now()
    },
    update:
    {
        type: Date,
        default: Date.now()
    }
},
    {
    collection: 'users'
    }
);

//configure options for User Model

let options = ({missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User); 