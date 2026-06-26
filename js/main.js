// =====================================
// main.js
// Application Entry Point
// =====================================

"use strict";

document.addEventListener("DOMContentLoaded",()=>{

    const simulateButton =
        document.getElementById("simulateButton");

    simulateButton.addEventListener(

        "click",

        runSimulation

    );

});



function runSimulation(){

    UI.showLoading();

    const results=[];

    const simulations=parseInt(

        document.getElementById(

            "simulationCount"

        ).value

    );

    const homeAdvantage=parseFloat(

        document.getElementById(

            "homeAdvantage"

        ).value

    );

    const maxGoals=parseInt(

        document.getElementById(

            "maxGoals"

        ).value

    );

    const cards=

        document.querySelectorAll(

            ".match-card"

        );

    cards.forEach((card,index)=>{

        const homeTeam=

            card.querySelector(

                ".homeTeam"

            ).value.trim();

        const awayTeam=

            card.querySelector(

                ".awayTeam"

            ).value.trim();

        if(

            homeTeam==="" ||

            awayTeam===""

        ){

            return;

        }

        const match={

            homeTeam,

            awayTeam,

            homeXG:parseFloat(

                card.querySelector(

                    ".homeXG"

                ).value

            ),

            awayXG:parseFloat(

                card.querySelector(

                    ".awayXG"

                ).value

            ),

            homeAttack:parseFloat(

                card.querySelector(

                    ".homeAttack"

                ).value

            ),

            awayAttack:parseFloat(

                card.querySelector(

                    ".awayAttack"

                ).value

            ),

            homeDefense:parseFloat(

                card.querySelector(

                    ".homeDefense"

                ).value

            ),

            awayDefense:parseFloat(

                card.querySelector(

                    ".awayDefense"

                ).value

            ),

            simulations,

            maxGoals,

            homeAdvantage

        };

        const result=

            Simulator.simulate(

                match

            );

        results.push(result);

        UI.updateProgress(

            ((index+1)/cards.length)

            *100

        );

    });

    UI.render(results);

    UI.hideLoading();

}
