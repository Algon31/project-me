const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },

    password:{
        type:String,
        required:true,
    },

    character:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Character",
        default:null,
    },

    selectedClass:{
        type:String,
        enum:[
            "Software Engineer",
            "Athlete",
            "Researcher",
            "Entrepreneur"
        ],
        default:"Software Engineer",
    }

},
{
    timestamps:true,
});

module.exports = mongoose.model("User",userSchema);