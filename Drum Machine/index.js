const audioSample = [
    {key: "Q", code: 81, id: "Heater 1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
    {key: "W", code: 87, id: "Heater 2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
    {key: "E", code: 69, id: "Heater 3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
    {key: "A", code: 65, id: "Heater 4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
    {key: "S", code: 83, id: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
    {key: "D", code: 68, id: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
    {key: "Z", code: 90, id: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
    {key: "X", code: 88, id: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
    {key: "C", code: 67, id: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}
  ];
  
  const Keys = ({ handleClick, handleKeyPress }) => (
    <div id="keys">
      {audioSample.map((sample) => (
          <button className="drum-pad" id={sample.id} onKeyDown={(event) => handleKeyPress(event)} onClick={() => handleClick(sample.id, sample.key)}>
            <span><strong>{sample.key}</strong></span>
            <audio className="clip" id={sample.key} src={sample.src}></audio>
          </button>
      ))}
    </div>
  );
  
  const Display = ({ input }) => (
    <div id="display">
      <span id="input"><strong>{input}</strong></span>
    </div>
  );
  
  
  
  const App = () => {
    
    const [input, setInput] = React.useState("");
    const [audioState, setAudioState] = React.useState(true);
    
    const toggleButton = () => {
      setAudioState(`${!audioState}`);
    }
    
    
    
    const handleClick = (id, key) => {
      var audio = document.getElementById(key);
      audio.play();
      handleDisplay(id);
    }
    
   const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      const sample = audioSample.find((sample) => sample.key === key);
  
      if (sample) {
        handlePress(sample.key);
        handleDisplay(sample.id);
      }
    };
    
    const handlePress = (key) => {
      const audio = document.getElementById(key);
      audio.play();
    }
    
    const handleDisplay = (id) => {
      setInput(`${id}`);
    }
    
    
    
    React.useEffect(() => {
      document.addEventListener("keydown", handleKeyPress);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, []);
    
    return (
      <div className="main">
        <div id="drum-machine">
          <Keys handleKeyPress={handleKeyPress} handleClick={handleClick} />
          <div id="info">
            <div id="toggleSwitch">
              <p><strong>POWER</strong></p>
              <input type="checkbox" id="switch" />
              <label for="switch"></label>
            </div>
            <Display input={input} />
          </div>
        </div>
      </div>
    );
  }
  
  
  ReactDOM.render(<App />, document.getElementById("app"));