import React from 'react';

const Address = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
    </tr>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '040-123456'
        }
      ],
      newName: '',
      newNumber: ''
    }
  }

  addName = (event) => {
    event.preventDefault()
    let personsArray = []
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (this.state.persons.find(person => person.name === this.state.newName)){
      personsArray = this.state.persons
    } else {
      personsArray = this.state.persons.concat(personObject)
    }

    this.setState({
      persons: personsArray,
      newName: '',
      newNumber: ''
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
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
            numero: <input value={this.state.newNumber}
                            onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
          {this.state.persons.map(person => <Address key={person.name}
            name={person.name} number={person.number} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
