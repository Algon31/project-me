const BASE_XP = 100;
const GROWTH_RATE = 1.25;

function xpRequired(level){

    return Math.floor(
        BASE_XP * Math.pow(GROWTH_RATE, level - 1)
    );

}

function calculateRank(level){
    if(level>=5000) return "GOD"
    if(level>=1000) return "SSS";
    if(level>=450) return "SS";
    if(level>=100) return "S";
    if(level>=70) return "A";
    if(level>=50) return "B";
    if(level>=30) return "C";
    if(level>=10) return "D";

    return "E";

}

module.exports = {

    xpRequired,
    calculateRank,

};