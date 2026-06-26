// ================================
// utils.js
// Helper Functions
// ================================

"use strict";

const Utils = {

    clamp(value,min,max){

        return Math.max(
            min,
            Math.min(max,value)
        );

    },



    round(value,decimal=2){

        return Number(
            value.toFixed(decimal)
        );

    },



    percent(value,total){

        if(total===0){

            return 0;

        }

        return (value/total)*100;

    },



    average(total,count){

        if(count===0){

            return 0;

        }

        return total/count;

    },



    random(min,max){

        return Math.random()*(max-min)+min;

    },



    randomInt(min,max){

        return Math.floor(

            Math.random()*(max-min+1)

        )+min;

    },



    probabilityToOdds(probability){

        if(probability<=0){

            return 0;

        }

        return 100/probability;

    },



    oddsToProbability(odds){

        if(odds<=0){

            return 0;

        }

        return 100/odds;

    },



    sortScoreMap(scoreMap){

        return Object.entries(scoreMap)

        .sort((a,b)=>b[1]-a[1]);

    },



    topScores(scoreMap,limit=10){

        return Utils
        .sortScoreMap(scoreMap)
        .slice(0,limit);

    },



    createScoreKey(homeGoals,awayGoals){

        return `${homeGoals}-${awayGoals}`;

    },



    incrementScore(scoreMap,key){

        if(scoreMap[key]){

            scoreMap[key]++;

        }

        else{

            scoreMap[key]=1;

        }

    },



    formatPercent(value){

        return `${Utils.round(value)}%`;

    },



    formatOdds(value){

        return Utils.round(value,2);

    },



    normalizeLambda(lambda){

        if(lambda<0){

            return 0;

        }

        if(lambda>6){

            return 6;

        }

        return lambda;

    },



    expectedGoals(

        xg,

        attack,

        defense,

        homeAdvantage=1

    ){

        let lambda =

        xg
        * attack
        * defense
        * homeAdvantage;

        return Utils.normalizeLambda(lambda);

    }

};
