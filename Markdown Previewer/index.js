const defaultInput = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.



You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

marked.setOptions({
  breaks: true,
  
});


class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <textarea id="editor" value={this.props.input} onChange={this.props.handleChange} />
      </div>
    );
  }
};



class Previewer extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <div id="preview"  dangerouslySetInnerHTML={{
          __html: marked.parse(this.props.input)
        }} />  
    );  
  }
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: defaultInput
    };
    this.handleChange= this.handleChange.bind(this);
  }
  
  
  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }
  
  render() {
    return (
      <div className="main">
        <Editor input={this.state.input} handleChange={this.handleChange} />
        <Previewer input={this.state.input} />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("app"));