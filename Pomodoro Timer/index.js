const Title = () => (
    <div id="title">
      <h1>25 + 5 Clock</h1>
    </div>
  );
  
  const Length = ({ input, session, handleDecrement, handleIncrement }) => (
    <div id="length">
      <div id="break">
        <h2 id="break-label">Break Length</h2>
        <div id="buttons">
          <button className="btn" id="break-decrement" onClick={() => handleDecrement("break")}><i class="fa-solid fa-arrow-down"></i></button>
          <h2 id="break-length">{input}</h2>
          <button className="btn" id="break-increment" onClick={() => handleIncrement("break")}><i class="fa-solid fa-arrow-up"></i></button>
        </div>
      </div>
      <div id="session">
        <h2 id="session-label">Session Length</h2>
        <div id="buttons">
          <button className="btn" id="session-decrement" onClick={() => handleDecrement("session")}><i class="fa-solid fa-arrow-down"></i></button>
          <h2 id="session-length">{session}</h2>
          <button className="btn" id="session-increment" onClick={() => handleIncrement("session")}><i class="fa-solid fa-arrow-up"></i></button>
        </div>
      </div>
    </div>
  );
  
  const Timer = ({ timer, formatTime, title }) => (
    <div id="timer">
      <h2 id="timer-label">{title}</h2>
      <span id="time-left">{formatTime(timer)}</span>
      <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
  
  const Controls = ({ handleReset, handleTimer }) => (
    <div id="controls">
      <button id="start_stop" className="btn" onClick={handleTimer}><i class="fa fa-play fa-2x"></i><i class="fa fa-pause fa-2x"></i></button>
      <button id="reset" className="btn" onClick={handleReset}><i class="fa-solid fa-arrows-rotate"></i></button>
    </div>
  );
  
  const App = () => {
    const [input, setInput] = React.useState(5);
    const [session, setSession] = React.useState(25);
    const [timer, setTimer] = React.useState(session * 60);
    const [pause, setPause] = React.useState(false);
    const [title, setTitle] = React.useState("Session");
    
    
    const handleTimer = () => {
      setPause(!pause);
      document.getElementById("break-decrement").disabled = true;
      document.getElementById("break-increment").disabled = true;
      document.getElementById("session-decrement").disabled = true;
      document.getElementById("session-increment").disabled = true;
    }
    
    
    const formatTime = (seconds) => {
      const minutes = Math.floor(timer / 60);
      const remainingSeconds = timer % 60;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    
    let audio = document.getElementById("beep");
    
    React.useEffect(() => {
      let intervalId;
      
      if(pause && timer > 0) {
        intervalId = setInterval(() => {
          setTimer(timer - 1);
        }, 1000);
      }
      
      
      
      if(timer == 0) {
        if(title === "Session") {
          setTimer(input * 60);
          setTitle("Break");
        } else {
          setTimer(session * 60);
          setTitle("Session");
        }
        document.getElementById("timer").style.color = "white";
        
      } 
      if (timer < 60 && timer > 0) {
        document.getElementById("timer").style.color = "red";
      }
      
      if(timer == 1) {
        setTimeout(() => {
          audio.play();
          
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, 4000);
          
        }, 1000);
      }
      
      return () => clearInterval(intervalId);
   }, [input, session, pause, timer]);
    
    const handleDecrement = (type) => {
      if(type === "break" && input > 1) {
        setInput(input - 1);
      } else if(type === "session" && session > 1) {
        setSession(session - 1);  
        setTimer((session - 1) * 60);
      }
      
    };
    
    
    const handleIncrement = (type) => {
      if(type === "break" && input < 60) {
        setInput(input + 1);
      } else if(type === "session" && session < 60) {
        setSession(session + 1);
        setTimer((session + 1) * 60);
      }
  
    };
    
    const handleReset = () => {
      setInput(5);
      setSession(25);
      setTimer(25 * 60);
      setPause(false);
      setTitle("Session");
      document.getElementById("break-decrement").disabled = false;
      document.getElementById("break-increment").disabled = false;
      document.getElementById("session-decrement").disabled = false;
      document.getElementById("session-increment").disabled = false;
      document.getElementById("timer").style.color = "white"
      audio.pause();
      audio.currentTime = 0;
    }
    
    
    
    return (
      <div id="main">
        <Title />
        <Length input={input} session={session} handleDecrement={handleDecrement} handleIncrement={handleIncrement} />
        <Timer timer={timer} formatTime={formatTime} title={title} />
        <Controls handleReset={handleReset} handleTimer={handleTimer} />
        <span id="profile">Created by <a href="https://github.com/RaunakN28">Raunak</a></span>
      </div>
    )
  }
  ReactDOM.render(<App />, document.getElementById("app"));