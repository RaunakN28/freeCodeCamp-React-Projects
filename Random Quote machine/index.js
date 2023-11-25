const quoteData = [
    {text: "The purpose of our lives is to be happy.", author: "Dalai Lama"},
    {text: "Life is what happens when you're busy making other plans.",             author: "John Lennon"},
    {text: "Get busy living or get busy dying.", author: "Stephen King"},
    {text: "You only live once, but if you do it right, once is enough.",           author: "Mae West"},
    {text: "Many of life’s failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison"},
    {text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein"},
    {text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth"},
    {text: "Money and success don’t change people; they merely amplify what is already there.", author: "Will Smith"},
    {text: "Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the           results of other people’s thinking.", author: "Steve Jobs"},
    {text: "Not how long, but how well you have lived is the main thing.", author: "Seneca"},
    {text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt"},
    {text: "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.", author: "Henry Ford"},
    {text: "In order to write about life first you must live it.", author: "Ernest Hemingway"},
    {text: "The big lesson in life, baby, is never be scared of anyone or anything.", author: "Frank Sinatra"},
    {text: "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.", author: "Leo Burnett"},
    {text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Soren Kierkegaard"},
    {text: "An unexamined life is not worth living.", author: "Socrates"},
    {text: "Turn your wounds into wisdom.", author: "Oprah Winfrey"},
    {text: "The way I see it, if you want the rainbow, you gotta put up with the rain.", author: "Dolly Parton"},
    {text: "Don’t settle for what life gives you; make life better and build something.", author: "Ashton Kutcher"},
    {text: "Everything negative – pressure, challenges – is all an opportunity for me to rise.Kobe Bryant", author: "Kobe Bryant"},
    {text: "You never really learn much from hearing yourself speak.", author: "George Clooney"},
    {text: "Life imposes things on you that you can’t control, but you still have the choice of how you’re going to live through this.", author: "Celine Dion"},
    {text: "Life is never easy. There is work to be done and obligations to be met – obligations to truth, to justice, and to liberty.", author: " John F. Kennedy"},
    {text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein"},
];


class QuoteBox extends React.Component {
constructor(props) {
  super(props);
}

render() {
  return (
    <div id="quote-box">
      <p id="text"><i class="fa-sharp fa-solid fa-quote-left"></i>  {this.props.quote.text}</p>
      <h3 id="author">-  {this.props.quote.author}</h3>
      <div class="actions">
        <button
          class="button btn"
          id="new-quote"
          onClick={this.props.handleNewQuote}
          >
          New Quote
        </button>
        <i id="tweet-icon" class="fa-brands fa-square-x-twitter">
        <a id="tweet-quote"
          href="twitter.com/intent/tweet"
          target="_blank">
          </a></i>
      </div>
      
    </div>
  );
}
};



class App extends React.Component {
constructor(props) {
  super(props);
  this.state ={
    randomIndex: Math.floor(Math.random() * quoteData.length)
  };
  this.handleNewQuote = this.handleNewQuote.bind(this);
  
}

handleNewQuote() {
  this.setState({
    randomIndex: Math.floor(Math.random() * quoteData.length)
  });
}


render() {
  
  const quote = quoteData[this.state.randomIndex];
  return (
    <div class="main">
      <QuoteBox handleNewQuote={this.handleNewQuote} quote={quote} />
      <span id="profile">Created by <a href="https://github.com/RaunakN28" target="_black">Raunak</a></span>
    </div>
  );
}
};


ReactDOM.render(<App />, document.getElementById("app"));