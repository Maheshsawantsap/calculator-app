const bigdecimal = require('decimal.js');

'use strict';
const cds = require("@sap/cds");
 
module.exports = cds.service.impl(async (srv) => {

    const
        {
            Calculations
        } = srv.entities;

    srv.on('getCalculations', async (req)=>{
        const calData = await getCalculationsRecords();
        return calData;
    })
    srv.on("POST", [Calculations], async (req) => {
        const { operator,value1, value2 } = req.data;

       const result = await calculatorFun(operator,value1, value2);
        console.log("post is working fine!");

        const newCalculation = [{
            operator,
            value1,
            value2,
            result,
        }];
        if(result !== '') {
            console.log('newCalculation -', newCalculation);
            await INSERT.into(Calculations).entries(newCalculation);
            console.log("post is working fine!",result);
        }
        return result;
    }
    );
    const calculatorFun = (operator,value1,value2) => {
        const num1 = new bigdecimal(value1);
        const num2 = new bigdecimal(value2);
        let result = '';
        if(operator === 'add' && typeof value1 === 'number' && typeof value2 === 'number' ) {
            result = num1.plus(num2);
        } else  if(operator === 'sub' && typeof value1 === 'number' && typeof value2 === 'number' ) {
            result = num1.minus(num2);
        } else  if(operator === 'divide' && typeof value1 === 'number' && typeof value2 === 'number' ) {
            result = num1.dividedBy(num2);
        } else {
            result = 'Error: Unsupported oprator';
        }
        return result;
    }

    const getCalculationsRecords = async () =>{
        const calculations = await SELECT.from(Calculations);
        return calculations;
    }
}
)
 