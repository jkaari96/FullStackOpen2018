import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdote}<br />
      has {props.votes} votes
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: [0, 0, 0, 0, 0, 0]
    }
  }

  nextAnecdote = () => {
    if (this.state.selected === anecdotes.length-1){
      return () => {
        this.setState({selected: 0})
      }
    }

    return () => {
      this.setState({selected: this.state.selected+1})
    }
  }

  getPopularIndex = () => {
    const index = this.state.points.indexOf(Math.max(...this.state.points))
    return index
  }

  printPopularAnecdote = () => {
    if (this.state.points.every(v => v === 0)){
      return (
        <div>
          no votes have been given yet.
        </div>
      )
    } else {
      return (
        <div>
          <Anecdote anecdote={this.props.anecdotes[this.getPopularIndex()]}
                    votes={this.state.points[this.getPopularIndex()]}/>
        </div>
      )
    }
  }

  voteAnecdote = () => {
    const elements = [...this.state.points]
    elements[this.state.selected] += 1

    return () => {
      this.setState({points: elements})
    }
  }

  render() {
    return (
      <div>
        <Anecdote anecdote={this.props.anecdotes[this.state.selected]}
                  votes={this.state.points[this.state.selected]}/>
        <button onClick={this.voteAnecdote()}>
          vote
        </button>
        <button onClick={this.nextAnecdote()}>
          next anecdote
        </button>
        <h2>anecdote with most votes:</h2>
        {this.printPopularAnecdote()}
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
