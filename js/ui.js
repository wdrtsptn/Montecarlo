// =====================================
// ui.js
// User Interface
// =====================================

"use strict";

const UI = {

    resultsContainer:
        document.getElementById("results"),

    loadingBar:
        document.getElementById("loadingBar"),

    loadingProgress:
        document.getElementById("loadingProgress"),



    clear(){

        this.resultsContainer.innerHTML="";

    },



    showLoading(){

        this.loadingBar.style.display="block";

        this.loadingProgress.style.width="0%";

    },



    hideLoading(){

        this.loadingBar.style.display="none";

        this.loadingProgress.style.width="0%";

    },



    updateProgress(percent){

        this.loadingProgress.style.width=

            percent+"%";

    },



    createTable(result){

        return `

<table class="result-table">

<tr>

<td>Home Win</td>

<td>${Utils.round(result.homeWinPct)}%</td>

</tr>

<tr>

<td>Draw</td>

<td>${Utils.round(result.drawPct)}%</td>

</tr>

<tr>

<td>Away Win</td>

<td>${Utils.round(result.awayWinPct)}%</td>

</tr>

<tr>

<td>BTTS</td>

<td>${Utils.round(result.bttsPct)}%</td>

</tr>

<tr>

<td>Over 0.5</td>

<td>${Utils.round(result.over05Pct)}%</td>

</tr>

<tr>

<td>Over 1.5</td>

<td>${Utils.round(result.over15Pct)}%</td>

</tr>

<tr>

<td>Over 2.5</td>

<td>${Utils.round(result.over25Pct)}%</td>

</tr>

<tr>

<td>Over 3.5</td>

<td>${Utils.round(result.over35Pct)}%</td>

</tr>

<tr>

<td>Over 4.5</td>

<td>${Utils.round(result.over45Pct)}%</td>

</tr>

<tr>

<td>Expected Goals</td>

<td>

${Utils.round(result.expectedHomeGoals)}

-

${Utils.round(result.expectedAwayGoals)}

</td>

</tr>

<tr>

<td>Fair Odds</td>

<td>

H ${Utils.round(result.homeOdds)}

|

D ${Utils.round(result.drawOdds)}

|

A ${Utils.round(result.awayOdds)}

</td>

</tr>

<tr>

<td>Confidence</td>

<td>

${Simulator.confidence(result)}%

</td>

</tr>

</table>

`;

    },



    createTopScores(result){

        let html="<ol>";

        result.topScores.forEach(score=>{

            html+=`

<li>

${score[0]}

-

${Utils.round(

(score[1]/result.simulations)*100

)}

%

</li>

`;

        });

        html+="</ol>";

        return html;

    },



    createCard(result){

        const card=document.createElement("div");

        card.className="result-card";

        card.innerHTML=`

<h2>

${result.homeTeam}

vs

${result.awayTeam}

</h2>

${this.createTable(result)}

<h3>

Top Scorelines

</h3>

${this.createTopScores(result)}

`;

        this.resultsContainer.appendChild(card);

    },



    render(results){

        this.clear();

        results.forEach(result=>{

            this.createCard(result);

        });

    }

};
