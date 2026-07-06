const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
{
    level:{
        type:Number,
        default:1,
    },

    xp:{
        type:Number,
        default:0,
    },

    totalXp:{
        type:Number,
        default:0,
    }

},
{
    _id:false,
});

const characterSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    },

    level:{
        type:Number,
        default:1,
    },

    xp:{
        type:Number,
        default:0,
    },

    totalXp:{
        type:Number,
        default:0,
    },

    rank:{
        type:String,
        enum:["E","D","C","B","A","S","SS","SSS"],
        default:"E",
    },

    currentStreak:{
        type:Number,
        default:0,
    },

    longestStreak:{
        type:Number,
        default:0,
    },

    attributes:{

        Strength:{type:statSchema,default:()=>({})},

        Endurance:{type:statSchema,default:()=>({})},

        Health:{type:statSchema,default:()=>({})},

        Knowledge:{type:statSchema,default:()=>({})},

        Focus:{type:statSchema,default:()=>({})},

        Creativity:{type:statSchema,default:()=>({})},

        Discipline:{type:statSchema,default:()=>({})},

        Consistency:{type:statSchema,default:()=>({})},

    },

    skills:{
        type:Map,
        of:statSchema,
        default:{},
    },

    achievements:{
        type:Map,
        of:Boolean,
        default:{},
    }

},
{
    timestamps:true,
});

module.exports = mongoose.model(
    "Character",
    characterSchema
);