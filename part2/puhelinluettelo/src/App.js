import React from 'react';

class AddNewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newName: '',
      newNumber: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.addName = this.addName.bind(this)
  }

  addName = (event) => {
    event.preventDefault()
    let personsArray = []
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (this.props.state.persons.find(person =>
      person.name === this.state.newName)){
      personsArray = this.props.state.persons
    } else {
      personsArray = this.props.state.persons.concat(personObject)
    }

    this.props.formFunction(personsArray)
    this.setState({newName: '', newNumber: ''})
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  render () {
    return (
      <form onSubmit={this.addName}>
        <h2>Lisää uusi</h2>
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
    )
  }
}

const Address = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.number}</td>
    </tr>
  )
}

const AddressList = (props) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
        {props.addresses.map(person => <Address key={person.name}
          name={person.name} number={person.number} />)}
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      filter: ''
    }

    this.handlePersonsChange = this.handlePersonsChange.bind(this)
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handlePersonsChange = (value) => {
    this.setState({persons: value})
  }

  render() {
    const addressesToShow = this.state.persons.filter(person =>
          person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä: <input value={this.state.filter}
                                    onChange={this.handleFilterChange} />
        </div>
        <AddNewForm state={this.state} formFunction={this.handlePersonsChange}/>
        <AddressList addresses={addressesToShow}/>
      </div>
    )
  }
}

export default App
