// ===================================
// montecarlo.js
// Monte Carlo Simulation Engine
// ===================================

"use strict";

const MonteCarlo = {

    simulate(config){

        const simulations = config.simulations;

        let homeWin = 0;
        let draw = 0;
        let awayWin = 0;

        let btts = 0;

        let over05 = 0;
        let over15 = 0;
        let over25 = 0;
        let over35 = 0;
        let over45 = 0;

        let homeCleanSheet = 0;
        let awayCleanSheet = 0;

        let totalHomeGoals = 0;
        let totalAwayGoals = 0;

        let scoreMap = {};

        for(let i=0;i<simulations;i++){

            const homeGoals =
                Poisson.random(
                    config.homeLambda,
                    config.maxGoals
                );

            const awayGoals =
                Poisson.random(
                    config.awayLambda,
                    config.maxGoals
                );

            totalHomeGoals += homeGoals;
            totalAwayGoals += awayGoals;

            if(homeGoals>awayGoals){

                homeWin++;

            }else if(homeGoals<awayGoals){

                awayWin++;

            }else{

                draw++;

            }

            if(homeGoals>0 && awayGoals>0){

                btts++;

            }

            if(homeGoals===0){

                homeCleanSheet++;

            }

            if(awayGoals===0){

                awayCleanSheet++;

            }

            const totalGoals =
                homeGoals + awayGoals;

            if(totalGoals>=1) over05++;
            if(totalGoals>=2) over15++;
            if(totalGoals>=3) over25++;
            if(totalGoals>=4) over35++;
            if(totalGoals>=5) over45++;

            const key =
                Utils.createScoreKey(
                    homeGoals,
                    awayGoals
                );

            Utils.incrementScore(
                scoreMap,
                key
            );

        }

        return{

            simulations,

            homeWin,

            draw,

            awayWin,

            btts,

            over05,

            over15,

            over25,

            over35,

            over45,

            homeCleanSheet,

            awayCleanSheet,

            expectedHomeGoals:

                Utils.average(
                    totalHomeGoals,
                    simulations
                ),

            expectedAwayGoals:

                Utils.average(
                    totalAwayGoals,
                    simulations
                ),

            homeWinPct:

                Utils.percent(
                    homeWin,
                    simulations
                ),

            drawPct:

                Utils.percent(
                    draw,
                    simulations
                ),

            awayWinPct:

                Utils.percent(
                    awayWin,
                    simulations
                ),

            bttsPct:

                Utils.percent(
                    btts,
                    simulations
                ),

            over05Pct:

                Utils.percent(
                    over05,
                    simulations
                ),

            over15Pct:

                Utils.percent(
                    over15,
                    simulations
                ),

            over25Pct:

                Utils.percent(
                    over25,
                    simulations
                ),

            over35Pct:

                Utils.percent(
                    over35,
                    simulations
                ),

            over45Pct:

                Utils.percent(
                    over45,
                    simulations
                ),

            homeCleanSheetPct:

                Utils.percent(
                    homeCleanSheet,
                    simulations
                ),

            awayCleanSheetPct:

                Utils.percent(
                    awayCleanSheet,
                    simulations
                ),

            scoreMap,

            topScores:

                Utils.topScores(
                    scoreMap,
                    10
                )

        };

    }

};
