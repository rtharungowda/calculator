import { useEffect, useState } from "react";

function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  
  const ops = ['/', '*', '+', '-', '.'];

  useEffect(() => {
    if(calc === ''){
      setResult('');
    }
    else if(ops.includes(calc.slice(-1)) === true){
      setResult(eval(calc.slice(0,-1).toString()));
    }
    else{
      setResult(eval(calc).toString());
    }
  }, [calc])

  const updateCalc = (value) => {
    if(ops.includes(value) && ((calc === '') || ops.includes(calc.slice(-1))))
      return;
    setCalc(calc + value);
  };

  const calculate = () => {
    setCalc(result);
  }

  const deleteLast = () => {
    if( calc === '') return;

    const value = calc.slice(0,-1);
    setCalc(value);
  }

  const numpad = () =>{
    const digits = [];
    for(let i = 1; i < 10; i++){
      digits.push(
        <button key={ i } onClick = { () => {
          updateCalc(i.toString());
        }}>{ i }</button>
      );
    }
    return digits;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({ result }) </span> : null}
          {calc || '0'}
        </div>
        <div className="operators">
          <button onClick= {() => {
            updateCalc('/');
          }}>/</button>
          <button onClick= {() => {
            updateCalc('*');
          }}>*</button>
          <button onClick= {() => {
            updateCalc('-');
          }}>-</button>
          <button onClick= {() => {
            updateCalc('+');
          }}>+</button>
          <button onClick={() => {
            deleteLast();
          }}>DEL</button>
          <button onClick = {() => {
            setCalc('');
          }}>C</button>
        </div>
        <div className="numpad">
          { numpad() }
          <button onClick = {() =>{
            updateCalc('0');
          }}>0</button>
          <button onClick = {() =>{
            updateCalc('.');
          }}>.</button>
          <button onClick={ () => {
            calculate();
          }}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
