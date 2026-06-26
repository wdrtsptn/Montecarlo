// =====================================
// odds.js
// Odds & Betting Utilities
// =====================================

"use strict";

const Odds = {

    probabilityToDecimal(probability){

        if(probability<=0){

            return 0;

        }

        return Number(

            (100/probability)

            .toFixed(2)

        );

    },



    decimalToProbability(decimal){

        if(decimal<=0){

            return 0;

        }

        return Number(

            (100/decimal)

            .toFixed(2)

        );

    },



    impliedProbability(decimal){

        if(decimal<=0){

            return 0;

        }

        return 1/decimal;

    },



    bookmakerMargin(home,draw,away){

        return (

            this.impliedProbability(home)

            +

            this.impliedProbability(draw)

            +

            this.impliedProbability(away)

            -

            1

        )*100;

    },



    expectedValue(probability,odds){

        probability/=100;

        return (

            probability*odds

            -

            1

        )*100;

    },



    valueBet(probability,marketOdds){

        const fair=

            this.probabilityToDecimal(

                probability

            );

        return{

            fairOdds:fair,

            marketOdds,

            edge:

                Number(

                    (

                        marketOdds-fair

                    )

                    .toFixed(2)

                ),

            value:

                marketOdds>fair

        };

    },



    threeWay(result){

        return{

            home:{

                probability:

                    result.homeWinPct,

                odds:

                    this.probabilityToDecimal(

                        result.homeWinPct

                    )

            },



            draw:{

                probability:

                    result.drawPct,

                odds:

                    this.probabilityToDecimal(

                        result.drawPct

                    )

            },



            away:{

                probability:

                    result.awayWinPct,

                odds:

                    this.probabilityToDecimal(

                        result.awayWinPct

                    )

            }

        };

    },



    overUnder(result){

        return{

            over05:

                this.probabilityToDecimal(

                    result.over05Pct

                ),

            over15:

                this.probabilityToDecimal(

                    result.over15Pct

                ),

            over25:

                this.probabilityToDecimal(

                    result.over25Pct

                ),

            over35:

                this.probabilityToDecimal(

                    result.over35Pct

                ),

            over45:

                this.probabilityToDecimal(

                    result.over45Pct

                )

        };

    },



    btts(result){

        return{

            probability:

                result.bttsPct,

            odds:

                this.probabilityToDecimal(

                    result.bttsPct

                )

        };

    }

};
