// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calculator{

    uint public result;
    event success(string msg);

    function addNum(uint num1, uint num2) public pure returns(uint)
    {
        return num1 + num2;
    }

    function subNum(uint num1, uint num2) public pure returns(uint)
    {
        return num1 - num2;
    }

    function mulNum(uint num1, uint num2) public
    {
        result = num1 * num2;
        emit success("Successfully multiplied!");
    }

    function divNum(uint num1, uint num2) public pure returns(uint)
    {
        require(num2 > 2, "Num2 cannot be zero or negative");
        require(num1 > num2, "Num1 should be greater than num2");
        return num1 / num2;
    }
}