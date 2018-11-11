import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

const Statistiikka = (props) => {


  return (
    <div>
      <Otsikko name="statistiikka"/>
      <ul>
        <li>{props.tila.tilastot[0].nimi} {props.tila.tilastot[0].value}</li>
        <li>{props.tila.tilastot[1].nimi} {props.tila.tilastot[1].value}</li>
        <li>{props.tila.tilastot[2].nimi} {props.tila.tilastot[2].value}</li>
        <li>
        {props.tila.tilastot[3].nimi} {
          Number.parseFloat(props.tila.tilastot[3].value).toFixed(1)}
        </li>
        <li>
        {props.tila.tilastot[4].nimi} {
          Number.parseFloat(props.tila.tilastot[4].value).toFixed(1)}%
        </li>
      </ul>
    </div>
  )
}

const Palaute = (props) => {
  return (
    <div>
      <Otsikko name="anna palautetta"/>
      <button onClick={props.tila.tilastot[0].funktio()}>
        {props.tila.tilastot[0].nimi}
      </button>
      <button onClick={props.tila.tilastot[1].funktio()}>
        {props.tila.tilastot[1].nimi}
      </button>
      <button onClick={props.tila.tilastot[2].funktio()}>
        {props.tila.tilastot[2].nimi}
      </button>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tilastot: [
        {
          nimi: "hyvä",
          value: 0,
          funktio: this.kasvataHyva
        },
        {
          nimi: "neutraali",
          value: 0,
          funktio: this.kasvataNeutraali
        },
        {
          nimi: "huono",
          value: 0,
          funktio: this.kasvataHuono
        },
        {
          nimi: "keskiarvo",
          value: 0,
        },
        {
          nimi: "positiivisia",
          value: 0,
        }
      ]
    }
  }

  kasvataHyva = () => {
    return () => {
      const elementit = this.state.tilastot
      elementit[0].value = elementit[0].value + 1
      elementit[3].value = this.laskeKeskiarvo()
      elementit[4].value = this.positiiviOsuus()

      this.setState({
        tilastot: elementit
      })
    }
  }

  kasvataNeutraali = () => {
    return () => {
      const elementit = this.state.tilastot
      elementit[1].value = elementit[1].value + 1
      elementit[3].value = this.laskeKeskiarvo()
      elementit[4].value = this.positiiviOsuus()

      this.setState({
        tilastot: elementit
      })
    }
  }

  kasvataHuono = () => {
    return () => {
      const elementit = this.state.tilastot
      elementit[2].value = elementit[2].value + 1
      elementit[3].value = this.laskeKeskiarvo()
      elementit[4].value = this.positiiviOsuus()

      this.setState({
        tilastot: elementit
      })
    }
  }

  laskeKeskiarvo = function() {
    const elementit = this.state.tilastot
    const keskiarvo = elementit[3].value = Math.abs(elementit[0].value -
      elementit[2].value) /
      (elementit[0].value +
        elementit[1].value + elementit[2].value)

    return keskiarvo
  }

  positiiviOsuus = function () {
    const elementit = this.state.tilastot
    const osuus = elementit[0].value / (elementit[0].value +
                  elementit[1].value + elementit[2].value) * 100

    return osuus
  }

  render() {
    return (
      <div>
        <Palaute tila={this.state} />
        <Statistiikka tila={this.state} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
