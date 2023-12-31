const {createContractInstance} = require('./connection');

async function addition(num1, num2)
{
    const {instance, accounts} = await createContractInstance();

    //const response = await instance.methods.addNum(num1, num2).send({from: accounts[0]});
    const response = await instance.methods.addNum(num1, num2).call({from: accounts[0]});

    console.log("Response: ", response);
}

addition(1,2);
module.exports = {addition}