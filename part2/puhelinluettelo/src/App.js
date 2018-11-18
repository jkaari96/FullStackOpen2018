import React from 'react';

const Address = (props) => {
  return (
    <div>
      {props.name}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName
    }

    let personsArray = []

    if (this.state.persons.indexOf(nameObject.name) !== -1) {
      personsArray = this.state.persons.concat(nameObject)
    } else {
      personsArray = this.state.persons
    }

    this.setState({
      persons: personsArray,
      newName: ''
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName}
                          onChange={this.handleNameChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => <Address key={person.name}
          name={person.name} />)}
      </div>
    )
  }
}

export default App
