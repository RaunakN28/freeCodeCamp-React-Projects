const calcData = [
  {id: "clear", value: "AC"},
  {id: "divide", value: "/"},
  {id: "multiply", value: "x"},
  {id: "seven", value: 7},
  {id: "eight", value: 8},
  {id: "nine", value: 9},
  {id: "subtract", value: "-"},
  {id: "four", value: 4},
  {id: "five", value: 5},
  {id: "six", value: 6},
  {id: "add", value: "+"},
  {id: "one", value: 1},
  {id: "two", value: 2},
  {id: "three", value: 3},
  {id: "equals", value: "="},
  {id: "zero", value: 0},
  {id: "decimal", value: "."}
];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const operators = ["AC", "/", "x", "+", "-", "="];

const Key = ({ id, value, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key id={key.id} value={key.value} handleInput={handleInput}/>
    ))}
  </div>
);

const Display = ({ output, input }) => (
  <div id="output">
    <span id="result">{output}</span>
    <span id="display">{input}</span>
  </div>
)

const App = () => {
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [data, setData] = React.useState("");
  
  const handleInput = (value) => {
    const number = numbers.find((num) => num == value);
    const operator = operators.find((op) => op == value);
    
    switch(value) {
      case "AC":
        handleClear();
        break;
      case "=":
        handleSubmit();
        break;
      case ".":
        dotOperator(value);
        break;
      case number:
        handleNumber(value);
        break;
      case operator:
        handleOperator(value);
        break;
      default:
        break;
    }
  }
  
  const handleClear = () => {
    setData("");
    setInput("0");
    setOutput("");
  }
  
  const handleSubmit = () => {
    const total = eval(data);
    setInput(`${total}`);
    setOutput(`${total}`);
    setData(`${total}`);
  }
  
  const dotOperator = (value) => {
    if(!data.length) {
      setData("0.");
      setInput("0.");
    } else {
      const lastChar = data.charAt(data.length - 1);
      
      if(lastChar === "x" || operators.includes(lastChar)) {
        setData(`${data}0.`);
        setInput("0.");
      } else {
        setData(lastChar === "." || input.includes(".") ? `${data}` : `${data}.`);
        setInput(lastChar === "." || input.includes(".") ? `${input}` : `${input}.`)
      }
      const validOp = value === "x" ? "*" : value;
      if(lastChar === "." && operators.includes(value)){
        setData(`${data.substring(0, data.length - input.length)}${validOp}`);
        setInput(`${value}`);
      }
    }
  }
  
  const handleNumber = (value) => {
    if(!data.length) {
      setInput(`${value}`);
      setData(`${value}`);
    } else {
      if(value === 0 && (input === "0" || data === "0")) {
        setData(`${value}`);
      } else {
        const lastChar = data.charAt(data.length - 1);
        const isLastCharOperator = lastChar === "*" || operators.includes(lastChar);
        
        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setData(`${data}${value}`);
      }
    }
  }
  
  const handleOperator = (value) => {
    const validOp = value === "x" ? "*" : value;
    if(!data.length) {
      setInput(`${value}`);
      setData(`${validOp}`);
    } else {  
      const lastChar = data.charAt(data.length - 1);
      const lastCharIsOperator = lastChar == "*" || operators.includes(lastChar);
      
      const beforeLastChar = data.charAt(data.length - 2);
      const beforeLastCharIsOperator = beforeLastChar == "*" || operators.includes(beforeLastChar);
      
      
      
      if((lastCharIsOperator && value !== "-") || beforeLastCharIsOperator && lastCharIsOperator) {
        if(beforeLastCharIsOperator) {
          setData(`${data.substring(0, data.length - 2)}${validOp}`);
          setInput(`${value}`);
        } else {
          setData(`${data.substring(0, data.length - 1)}${validOp}`);
          setInput(`${value}`);
        }
      } else {
        setData(`${data}${validOp}`);
        setInput(`${value}`);
      }
    }
  }
  
  const handleOutput = () => {
    setOutput(data);
  }
  
  React.useEffect(() => {
    handleOutput();
  }, [data]);
  
  return (
    <div id="calculator">
      <div id="main">
        <Display output={output} input={input} />
        <Keyboard handleInput={handleInput} />
      </div>
      <span>Designed by <a href="https://github.com/RaunakN28">Raunak</a></span>
    </div>  
  )
}

ReactDOM.render(<App />, document.getElementById("app"));