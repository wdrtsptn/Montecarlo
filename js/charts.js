// =====================================
// charts.js
// Score Matrix & Statistics
// =====================================

"use strict";

const Charts = {

    createHeatmap(scoreMap,maxGoals=10){

        const matrix=[];

        for(let h=0;h<=maxGoals;h++){

            matrix[h]=[];

            for(let a=0;a<=maxGoals;a++){

                const key=`${h}-${a}`;

                matrix[h][a]=scoreMap[key]||0;

            }

        }

        return matrix;

    },



    normalize(matrix){

        let max=0;

        matrix.forEach(row=>{

            row.forEach(value=>{

                if(value>max){

                    max=value;

                }

            });

        });

        if(max===0){

            return matrix;

        }

        return matrix.map(row=>

            row.map(value=>

                value/max

            )

        );

    },



    scoreDistribution(result){

        const home={};

        const away={};

        Object.entries(result.scoreMap)

        .forEach(([score,count])=>{

            const split=score.split("-");

            const h=parseInt(split[0]);

            const a=parseInt(split[1]);

            home[h]=(home[h]||0)+count;
            away[a]=(away[a]||0)+count;

        });

        return{

            home,

            away

        };

    },



    goalFrequency(result){

        const goals={};

        Object.entries(result.scoreMap)

        .forEach(([score,count])=>{

            const split=score.split("-");

            const total=

                Number(split[0])+

                Number(split[1]);

            goals[total]=(goals[total]||0)+count;

        });

        return goals;

    },



    winBreakdown(result){

        return{

            home:

                Utils.round(result.homeWinPct),

            draw:

                Utils.round(result.drawPct),

            away:

                Utils.round(result.awayWinPct)

        };

    },



    export(result){

        return{

            heatmap:

                this.normalize(

                    this.createHeatmap(

                        result.scoreMap

                    )

                ),

            goals:

                this.goalFrequency(

                    result

                ),

            distribution:

                this.scoreDistribution(

                    result

                ),

            winrate:

                this.winBreakdown(

                    result

                )

        };

    }

};
