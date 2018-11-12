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
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.tila.hyva === 0 && props.tila.neutraali === 0 &&
      props.tila.huono === 0){
        return (
          <div>
            <p>ei yhtään palautetta annettu</p>
          </div>
        )
  } else {
    return (
      <div>
        <table>
          <Statistic name="hyvä"
            value={props.tila.hyva} />
          <Statistic name="neutraali"
            value={props.tila.neutraali} />
          <Statistic name="huono"
            value={props.tila.huono} />
          <Statistic name="keskiarvo"
            value={props.funktiot.laskeKeskiarvo().toFixed(1)} />
          <Statistic name="positiivisia"
            value={props.funktiot.laskePositiivistenOsuus().toFixed(1) + "%"} />
        </table>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }

    this.tilastoFunktiot.laskeKeskiarvo =
        this.tilastoFunktiot.laskeKeskiarvo.bind(this)
    this.tilastoFunktiot.laskePositiivistenOsuus =
        this.tilastoFunktiot.laskePositiivistenOsuus.bind(this)
  }

  tilastoFunktiot = {
    laskeKeskiarvo: function() {
      const ka = (this.state.hyva - this.state.huono) /
      (this.state.hyva + this.state.neutraali + this.state.huono)
      return ka
    },

    laskePositiivistenOsuus: function () {
      const pos = ((this.state.hyva) / (this.state.hyva
        + this.state.neutraali
        + this.state.huono)) * 100
      return pos
    }
  }

  kasvataArvoa = (destination) => {
    const value = this.state[destination]+1

    if (destination === "hyva"){
      return () => {
        this.setState({hyva: value})
      }
    } else if (destination === "neutraali"){
      return () => {
        this.setState({neutraali: value})
      }
    } else {
      return () => {
        this.setState({huono: value})
      }
    }
  }

  render() {
    return (
      <div>
        <Otsikko name="anna palautetta"/>
        <Button name="hyvä"
          funktio={this.kasvataArvoa("hyva")} />
        <Button name="neutraali"
          funktio={this.kasvataArvoa("neutraali")} />
        <Button name="huono"
          funktio={this.kasvataArvoa("huono")} />
        <Otsikko name="statistiikka"/>
        <Statistics tila={this.state} funktiot={this.tilastoFunktiot} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
