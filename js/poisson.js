// ================================
// poisson.js
// Poisson Distribution Engine
// ================================

"use strict";

const Poisson = {

    factorialCache : {

        0 : 1,

        1 : 1

    },



    factorial(n){

        if(this.factorialCache[n]){

            return this.factorialCache[n];

        }

        let value = 1;

        for(let i=2;i<=n;i++){

            value *= i;

        }

        this.factorialCache[n]=value;

        return value;

    },



    probability(lambda,k){

        lambda = Utils.normalizeLambda(lambda);

        return (

            Math.exp(-lambda)

            *

            Math.pow(lambda,k)

        )

        /

        this.factorial(k);

    },



    cumulative(lambda,maxGoal=10){

        let list=[];

        let total=0;

        for(let i=0;i<=maxGoal;i++){

            total += this.probability(

                lambda,

                i

            );

            list.push(total);

        }

        return list;

    },



    random(lambda,maxGoal=10){

        const table =

        this.cumulative(

            lambda,

            maxGoal

        );

        const r=Math.random();

        for(

            let i=0;

            i<table.length;

            i++

        ){

            if(r<=table[i]){

                return i;

            }

        }

        return maxGoal;

    },



    matrix(

        homeLambda,

        awayLambda,

        maxGoal=10

    ){

        const matrix=[];

        for(

            let h=0;

            h<=maxGoal;

            h++

        ){

            matrix[h]=[];

            for(

                let a=0;

                a<=maxGoal;

                a++

            ){

                matrix[h][a]=

                this.probability(

                    homeLambda,

                    h

                )

                *

                this.probability(

                    awayLambda,

                    a

                );

            }

        }

        return matrix;

    },



    expected(lambda,maxGoal=10){

        let expected=0;

        for(

            let i=0;

            i<=maxGoal;

            i++

        ){

            expected +=

            i

            *

            this.probability(

                lambda,

                i

            );

        }

        return expected;

    },



    distribution(lambda,maxGoal=10){

        const list=[];

        for(

            let i=0;

            i<=maxGoal;

            i++

        ){

            list.push({

                goal:i,

                probability:

                this.probability(

                    lambda,

                    i

                )

            });

        }

        return list;

    }

};
