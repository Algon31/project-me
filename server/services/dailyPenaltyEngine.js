const {

    decayAttribute,

} = require("./attributeEngine");

async function applyPenalty(

    character,

    quests

){

    const gym = quests.find(

        q => q.name === "Gym"

    );

    if (

        gym &&

        !gym.completed

    ){

        await decayAttribute(

            character,

            "Strength"

        );

    }

    const read = quests.find(

        q=>q.name==="Reading"

    );

    if(

        read &&

        !read.completed

    ){

        await decayAttribute(

            character,

            "Knowledge"

        );

    }

}

module.exports={

    applyPenalty,

};