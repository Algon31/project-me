const mongoose = require("mongoose");

const questSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    name:{
        type:String,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        default:"",
        trim:true,
    },

    category:{
        type:String,
        enum:[
            "Physical",
            "Mind",
            "Lifestyle",
        ],
        required:true,
    },

    questType:{
        type:String,
        enum:[
            "Core",
            "Growth",
            "Side",
        ],
        default:"Core",
    },

    inputType:{
        type:String,
        enum:[
            "checkbox",
            "number",
            "text",
        ],
        required:true,
    },

    xpType:{
        type:String,
        enum:[
            "fixed",
            "perUnit",
        ],
        default:"fixed",
    },

    xpReward:{
        type:Number,
        required:true,
        min:0,
    },

    maxXpPerDay:{
        type:Number,
        default:100,
    },

    antiFarm:{
        type:Boolean,
        default:true,
    },

    unlockLevel:{
        type:Number,
        default:1,
    },

    affectsAttributes:[
        {
            type:String,
            enum:[
                "Strength",
                "Endurance",
                "Health",
                "Knowledge",
                "Focus",
                "Creativity",
                "Discipline",
                "Consistency",
            ],
        },
    ],

    affectsSkills:[
        {
            type:String,
            trim:true,
        },
    ],

    difficulty:{
        type:String,
        enum:[
            "Easy",
            "Medium",
            "Hard",
            "Epic",
        ],
        default:"Easy",
    },

    repeat:{
        type:String,
        enum:[
            "Daily",
            "Weekly",
            "Monthly",
        ],
        default:"Daily",
    },

    goldReward:{
        type:Number,
        default:0,
    },

    active:{
        type:Boolean,
        default:true,
    },

    order:{
        type:Number,
        default:0,
    },
},
{
    timestamps:true,
});

module.exports = mongoose.model(
    "Quest",
    questSchema
);