import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.funktio}>{props.name}</button>
  )
}

const Statistic = (props) => {
  return (
    <li>{props.name} {props.value}</li>
  )
}

const Statistics = (props) => {
  if (props.tila[0].value === 0 && props.tila[1].value === 0 &&
      props.tila[2].value === 0){
        return (
          <div>
            <Otsikko name="statistiikka"/>
            <p>ei yhtään palautetta annettu</p>
          </div>
        )
  } else {
    return (
      <div>
        <Otsikko name="statistiikka"/>
        <ul>
          <Statistic name={props.tila[0].nimi}
            value={props.tila[0].value} />
          <Statistic name={props.tila[1].nimi}
            value={props.tila[1].value} />
          <Statistic name={props.tila[2].nimi}
            value={props.tila[2].value} />
          <Statistic name={props.tila[3].nimi}
            value={props.tila[3].value.toFixed(1)} />
          <Statistic name={props.tila[4].nimi}
            value={props.tila[4].value.toFixed(1) + "%"} />
        </ul>
      </div>
    )
  }
}

const Palaute = (props) => {
  return (
    <div>
      <Otsikko name="anna palautetta"/>
      <Button funktio={props.tila[0].funktio()}
              name={props.tila[0].nimi} />
      <Button funktio={props.tila[1].funktio()}
              name={props.tila[1].nimi} />
      <Button funktio={props.tila[2].funktio()}
              name={props.tila[2].nimi} />
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
    const osuus = (elementit[0].value / (elementit[0].value +
                  elementit[1].value + elementit[2].value) * 100)
    return osuus
  }

  render() {
    return (
      <div>
        <Palaute tila={this.state.tilastot} />
        <Statistics tila={this.state.tilastot} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
