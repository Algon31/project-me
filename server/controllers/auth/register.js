const bcrypt = require("bcrypt");

const User = require("../../models/User");
const Character = require("../../models/Character");

const register = async (req,res)=>{

    try{

        const {
            name,
            email,
            password,
        } = req.body;

        const exists = await User.findOne({
            email,
        });

        if(exists){

            return res.status(400).json({
                message:"User already exists.",
            });

        }

        const hashedPassword =
        await bcrypt.hash(password,10);

        const user = await User.create({

            name,
            email,
            password:hashedPassword,

        });

        const character =
        await Character.create({

            user:user._id,

        });

        user.character = character._id;

        await user.save();

        res.status(201).json({

            message:"Registration Successful",

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Server Error",

        });

    }

};

module.exports = register;