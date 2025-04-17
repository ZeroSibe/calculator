import { JSX, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [calc, setCalc] = useState<string>("");

  const operators: string[] = ["/", "*", "+", "-", "."];

  const updateCalc = (value: string): void => {
    //if you press operators first or select two operators x
    if (
      (operators.includes(value) && calc === "") ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
  };

  const calculate = (): void => {
    setCalc(eval(calc).toString());
  };

  const deleteLastValue = (): void => {
    if (calc === "") {
      return;
    }

    const value: string = calc.slice(0, -1);

    setCalc(value);
  };

  const createDigits = (): JSX.Element[] => {
    const digits: JSX.Element[] = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  return (
    <div className={styles.App}>
      <div className={styles.calculator}>
        <div className={styles.display}>{calc || "0"}</div>
        <div className={styles.operators}>
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => updateCalc("+")}>+</button>

          <button onClick={deleteLastValue}>DEL</button>
        </div>
        <div className={styles.digits}>
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
