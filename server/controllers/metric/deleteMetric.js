const Metric = require("../../models/Metric");

const deleteMetric = async (req,res)=>{

    try{

        const metric = await Metric.findOneAndUpdate(

            {
                _id:req.params.id,
                user:req.user.id
            },

            {
                active:false
            },

            {
                new:true
            }

        );

        res.json(metric);

    }
    catch(error){

        res.status(500).json({
            message:"Server Error"
        });

    }

};

module.exports = deleteMetric;