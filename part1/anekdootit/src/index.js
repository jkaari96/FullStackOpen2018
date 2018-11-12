import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  pickRandomAnecdote = () => {
    let selection = Math.floor(Math.random() * (anecdotes.length))

    while (selection === this.state.selected){
      selection = Math.floor(Math.random() * (anecdotes.length))
    }

    return () => {
      this.setState({selected: selection})
    }
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}<br />
        <button onClick={this.pickRandomAnecdote()}>
          Pick random anecdote
        </button>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)