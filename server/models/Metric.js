const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    name:{
        type:String,
        required:true,
        trim:true
    },

    type:{
        type:String,
        enum:["checkbox","number","text"],
        required:true
    },

    weight:{
        type:Number,
        default:0
    },

    icon:{
        type:String,
        default:""
    },

    color:{
        type:String,
        default:"blue"
    },

    order:{
        type:Number,
        default:0
    },

    active:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Metric",metricSchema);