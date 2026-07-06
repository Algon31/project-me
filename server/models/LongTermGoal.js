const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        default:"",
    },

    category:{
        type:String,
        enum:["Physical","Mind","Career","Life"],
        default:"Mind",
    },

    progress:{
        type:Number,
        default:0,
    },

    target:{
        type:Number,
        default:100,
    },

    xpReward:{
        type:Number,
        default:1000,
    },

    completed:{
        type:Boolean,
        default:false,
    },

    deadline:{
        type:Date,
    }

},
{
    timestamps:true,
});

module.exports = mongoose.model(
    "LongTermGoal",
    goalSchema
);