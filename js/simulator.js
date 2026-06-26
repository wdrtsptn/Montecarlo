// =====================================
// simulator.js
// Match Simulation Logic
// =====================================

"use strict";

const Simulator = {

    createConfig(match){

        const homeAdvantage =
            parseFloat(match.homeAdvantage);

        const homeLambda =

            Utils.expectedGoals(

                match.homeXG,

                match.homeAttack,

                match.awayDefense,

                homeAdvantage

            );

        const awayLambda =

            Utils.expectedGoals(

                match.awayXG,

                match.awayAttack,

                match.homeDefense,

                1

            );

        return{

            homeTeam:

                match.homeTeam,

            awayTeam:

                match.awayTeam,

            simulations:

                match.simulations,

            maxGoals:

                match.maxGoals,

            homeLambda,

            awayLambda

        };

    },



    simulate(match){

        const config =

            this.createConfig(

                match

            );

        const result =

            MonteCarlo.simulate(

                config

            );

        result.homeTeam =

            config.homeTeam;

        result.awayTeam =

            config.awayTeam;

        result.homeLambda =

            config.homeLambda;

        result.awayLambda =

            config.awayLambda;

        result.homeOdds =

            Utils.probabilityToOdds(

                result.homeWinPct

            );

        result.drawOdds =

            Utils.probabilityToOdds(

                result.drawPct

            );

        result.awayOdds =

            Utils.probabilityToOdds(

                result.awayWinPct

            );

        result.favorite =

            this.favorite(

                result.homeWinPct,

                result.drawPct,

                result.awayWinPct

            );

        return result;

    },



    favorite(

        home,

        draw,

        away

    ){

        if(

            home > draw &&

            home > away

        ){

            return "HOME";

        }

        if(

            away > draw &&

            away > home

        ){

            return "AWAY";

        }

        return "DRAW";

    },



    confidence(result){

        const values=[

            result.homeWinPct,

            result.drawPct,

            result.awayWinPct

        ];

        values.sort(

            (a,b)=>b-a

        );

        return Utils.round(

            values[0]-values[1]

        );

    },



    summary(result){

        return{

            match:

                `${result.homeTeam} vs ${result.awayTeam}`,

            winner:

                result.favorite,

            confidence:

                this.confidence(

                    result

                ),

            expectedGoals:

                Utils.round(

                    result.expectedHomeGoals +

                    result.expectedAwayGoals

                ),

            btts:

                Utils.round(

                    result.bttsPct

                ),

            over25:

                Utils.round(

                    result.over25Pct

                )

        };

    }

};
