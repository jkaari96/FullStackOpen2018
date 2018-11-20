import React from 'react'
import axios from 'axios'

const Country = (props) => {
  return (
    <div>
      {props.name}
    </div>
  )
}

const CountryDetailed = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>capital: {props.capital}</p>
      <p>population: {props.population}</p>
      <img src={props.flag} width="100%" alt="" />
    </div>
  )
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
        {countryArray.map(country => <CountryDetailed key={country.name}
          name={country.name} capital={country.capital}
          population={country.population} flag={country.flag} />)}
        </div>
      )
    } else{
      return (
        <div>
        {countryArray.map(country => <Country key={country.name}
           name={country.name}/>)}
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
