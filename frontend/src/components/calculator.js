import React, {useState} from 'react';

import Wrapper from "./cal/Wrapper";
import Screen from "./cal/Screen";
import ButtonBox from "./cal/ButtonBox";
import Button from "./cal/Button";
import {addFunction, subFunction, mulFunction, divFunction} from '../web3_functions.js'

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

// const math = (a, b, sign) =>
//   sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

const zeroDivisionError = "Can't divide with 0";

export default function Calculator(props){

    const [size, setSize] = useState('large');
    const [num1, setnum1] = useState(0);
    const [num2, setnum2] = useState(0);

    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
      });

    async function math(num1, num2, operationType){

        let operResult = 0;

        if(props.contractInstance == null)
        {
            return;
        }

        switch(operationType)
        {
            case "+": debugger; return await addFunction(props.contractInstance, props.account, num1, num2);

            case "-": 
                let res = await subFunction(props.contractInstance, props.account, num1, num2);
                console.log('res:', res);
                return res;

            case "*":
            case "X":
            case "x":
                return await mulFunction(props.contractInstance, props.account, num1, num2);

            case "/": return await divFunction(props.contractInstance, props.account, num1, num2);
        }
    }

    const resetClickHandler = () => {
        setCalc({
          ...calc,
          sign: "",
          num: 0,
          res: 0,
        });
      };

      const signClickHandler = async (e) => {
        setCalc({
          ...calc,
          sign: e.target.innerHTML,
          res: !calc.num
            ? calc.res
            : !calc.res
            ? calc.num
            : toLocaleString(
                await math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
          num: 0,
        });
      };
      
      const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
        if (removeSpaces(calc.num).length < 16) {
          setCalc({
            ...calc,
            num:
              removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
                ? toLocaleString(Number(removeSpaces(calc.num + value)))
                : toLocaleString(calc.num + value),
            res: !calc.sign ? 0 : calc.res,
          });
        }
      };

      const equalsClickHandler = async () => {
        
        if (calc.sign && calc.num) {
          setCalc({
            ...calc,
            res:
              calc.num === "0" && calc.sign === "/"
                ? zeroDivisionError
                : toLocaleString(
                    await math(
                      Number(removeSpaces(calc.res)),
                      Number(removeSpaces(calc.num)),
                      calc.sign
                    )
                  ),
            sign: "",
            num: 0,
          });
        }
      };

    const buttonClickHandler = (e, btn) => {
        btn === "C" || calc.res === zeroDivisionError
        ? resetClickHandler()
        // : btn === "+-"
        // ? invertClickHandler()
        // : btn === "%"
        // ? percentClickHandler()
        : btn === "="
        ? equalsClickHandler()
        : btn === "/" || btn === "X" || btn === "-" || btn === "+"
        ? signClickHandler(e)
        // : btn === "."
        // ? comaClickHandler(e)
        : numClickHandler(e)
      }

    return (
        <Wrapper>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={(e) => buttonClickHandler(e, btn)}
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    );
}