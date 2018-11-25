import React from 'react'
import personService from './services/persons'

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
    personsArray = this.props.state.persons
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (!this.props.state.persons.find(person =>
      person.name.toLowerCase() === this.state.newName.toLowerCase())){
        personService
          .create(personObject)
          .then(response => {
            personsArray = this.props.state.persons.concat(response.data)
            this.props.formFunction(personsArray)
            this.setState({newName: '', newNumber: ''})
      })
    } else {
      const result = window.confirm(`${this.state.newName} on jo luettelossa,
        korvataanko vanha numero uudella?`)

      if (result) {
        const address = this.props.state.persons.find(person =>
          person.name.toLowerCase() === this.state.newName.toLowerCase())
        console.log(address)
        const changedAddress = {...address, number: this.state.newNumber}

        personService
          .update(address.id, changedAddress)
          .then(response => {
            const changedArray = this.props.state.persons.map(person =>
              person.id !== address.id ? person : response.data)
            this.props.formFunction(changedArray)
            this.setState({newName: '', newNumber: ''})
          })
      }
    }
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
      <td>
        <button onClick={props.removeFunction}>
          poista
        </button>
      </td>
    </tr>
  )
}

const AddressList = (props) => {
  const removeFunc = (id, name) => {
    return () => {
      const result = window.confirm(`poistetaanko ${name}`)
      if (result){
        personService
          .deleteEntry(id)
          .then(response => {
            personService
              .getAll()
              .then(response => {
                props.update(response.data)
            })
        })
      }
    }
  }

  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
        {props.addresses.map(person => <Address key={person.name}
          name={person.name} number={person.number}
          removeFunction={removeFunc(person.id, person.name)}/>)}
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
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

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        const persons = response.data
        this.setState({ persons: persons })
      })
  }

  render() {
    const addressesToShow = this.state.persons.filter(person =>
          person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä: <input value={this.state.filter}
                                    onChange={this.handleFilterChange} />
        </div>
        <AddNewForm state={this.state} formFunction={this.handlePersonsChange}/>
        <AddressList addresses={addressesToShow} state={this.state}
          update={this.handlePersonsChange}/>
      </div>
    )
  }
}

export default App
