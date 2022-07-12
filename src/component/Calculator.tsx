import { useState } from "react";
import calculate, { ButtonCode, State } from "../logic/calculate";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";
import "./Calculator.scss"

export default function Calculator() {
const [state,setState] = useState<State>({
    current:"0",
    operand:0,
    operator:null,
    formula:"0",
    isNextClear:false

});

const buttonHandler = (code: ButtonCode) =>{
    const nextState =  calculate(code,state);
    setState(nextState);
};

    return (
    <div>
        <Display value={state.current} formula={state.formula}/>
        <ButtonPanel  buttonHandler={buttonHandler}/>
    </div>
    )
}