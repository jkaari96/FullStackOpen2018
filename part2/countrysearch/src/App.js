import React from 'react'
import axios from 'axios'

class Country extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      toggled: this.props.isToggled
    }

    this.clickFunction = this.clickFunction.bind(this)
  }

  clickFunction() {
    if (this.state.toggled){
      this.setState({toggled: false})
    } else {
      this.setState({toggled: true})
    }
  }

  render () {
    const display = () => {
      if (!this.state.toggled){
        return (
          <div>
            {this.props.name}
          </div>
        )
      } else {
        return (
          <div>
            <h1>{this.props.name}</h1>
            <p>capital: {this.props.capital}</p>
            <p>population: {this.props.population}</p>
            <img src={this.props.flag} width="100%" alt="" />
          </div>
        )
      }
    }

    return (
      <div onClick={this.clickFunction}>
        {display()}
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data
        this.setState({ countries: countries })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  printCountries(countryArray) {
    if (countryArray.length > 10){
      return (
        <div>
          too many matches, specify another filter
        </div>
      )
    } else if (countryArray.length === 1) {
      return (
        <div>
        {countryArray.map(country => <Country key={country.name}
          name={country.name} capital={country.capital}
          population={country.population} flag={country.flag}
          isToggled={true} />)}
        </div>
      )
    } else{
      return (
        <div>
        {countryArray.map(country => <Country key={country.name}
          name={country.name} capital={country.capital}
          population={country.population} flag={country.flag}
          isToggled={false} />)}
        </div>
      )
    }
  }

  render() {
    const visibleCountries = this.state.countries.filter(country =>
          country.name.toLowerCase().includes(
            this.state.filter.toLowerCase()))

    return (
      <div>
        <div>
          find countries: <input value={this.state.filter}
                                    onChange={this.handleFilterChange} />
        </div>
        {this.printCountries(visibleCountries)}
      </div>
    )
  }
}

export default App
