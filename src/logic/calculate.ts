export type Operator = "+" | "-" | "/" | "*";
export type NumberCode =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";
export type ButtonCode = NumberCode | Operator | "." | "D" | "AC" | "=";

export interface State {
  current: string;
  operand: number;
  operator: string | null;
  formula: string;
  isNextClear: boolean;
}

export default function calculate(button: ButtonCode, state: State): State {
  //数値かどうか
  if (isNumberButton(button)) {
    return handleNumberButton(button, state);
  }

  //オペレータかどうか
  if (isOperatorButton(button)) {
    return handeOperatorButton(button, state);
  }

  //.かどうか
  if (isDotButton(button)) {
    return handeDotButton(button, state);
  }

  //削除ボタンかどうか
  if (isDeleteButton(button)) {
    return handeDeleteButton(state);
  }

  //ACかどうか
  if (isAllClearButton(button)) {
    return handeAllClearButton();
  }

  //=かどうか
  if (isEqualeButton(button)) {
    return handeEqualeButton(state);
  }

  return state;
}

function isNumberButton(button: string): button is NumberCode {
  return (
    button === "0" ||
    button === "1" ||
    button === "2" ||
    button === "3" ||
    button === "4" ||
    button === "5" ||
    button === "6" ||
    button === "7" ||
    button === "8" ||
    button === "9"
  );
}

function handleNumberButton(button: NumberCode, state: State): State {
  if (state.isNextClear) {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      formula: state.formula + button,
      isNextClear: false,
    };
  }

  if (state.current === "0") {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      formula: button,
      isNextClear: false,
    };
  }

  return {
    current: state.current + button,
    operand: state.operand,
    operator: state.operator,
    formula: state.formula + button,
    isNextClear: false,
  };
}

function isOperatorButton(button: string): button is Operator {
  return button === "+" || button === "-" || button === "*" || button === "/";
}

function handeOperatorButton(button: Operator, state: State): State {
  let buttonFlg = ["+", "-", "*", "/"].includes(state.formula.slice(-1));
  console.log(buttonFlg);
  console.log(state.formula.slice(-1));
  if (buttonFlg) {
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      formula: state.formula,
      isNextClear: true,
    };
  }

  if (!buttonFlg) {
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      formula: state.formula + button,
      isNextClear: true,
    };
  }

  if (state.isNextClear || state.operator === null) {
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      formula: state.formula + button,
      isNextClear: true,
    };
  }

  const nextValue = operata(state);

  return {
    current: `${nextValue}`,
    operand: nextValue,
    operator: button,
    formula: state.formula,
    isNextClear: true,
  };
}

function isDotButton(button: string) {
  return button === ".";
}

function handeDotButton(button: string, state: State): State {
  if (state.current.indexOf(".") !== -1) {
    return state;
  }

  return {
    current: state.current + ".",
    operand: state.operand,
    operator: state.operator,
    formula: state.formula + button,
    isNextClear: false,
  };
}

function isDeleteButton(button: string) {
  return button === "D";
}

function handeDeleteButton(state: State): State {
  if (state.current.length === 1) {
    return {
      current: "0",
      operand: state.operand,
      operator: state.operator,
      formula: "0",
      isNextClear: false,
    };
  }

  return {
    current: state.current.substring(0, state.current.length - 1),
    operand: state.operand,
    operator: state.operator,
    formula: state.formula.substring(0, state.formula.length - 1),
    isNextClear: false,
  };
}

function isAllClearButton(button: string) {
  return button === "AC";
}

function handeAllClearButton(): State {
  return {
    current: "0",
    operand: 0,
    operator: null,
    formula: "0",
    isNextClear: false,
  };
}

function isEqualeButton(button: string) {
  return button === "=";
}

function handeEqualeButton(state: State): State {
  if (state.operator === null || state.isNextClear) {
    return state;
  }

  const nextValue = operata(state);
  return {
    current: `${nextValue}`,
    operand: 0,
    operator: null,
    formula: `${nextValue}` ,
    isNextClear: true,
  };
}

function operata(state: State): number {
  const total = new Function("return " + state.formula)();
  return total;
  
}
