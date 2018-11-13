import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.teksti}</h1>
  )
}

const Osa = (props) => {
  return (
    <p>{props.nimi} {props.tehtavia}</p>
  )
}

const Yhteensa = (props) => {
  const tehtavaMaarat = props.osat.map(osa => osa.tehtavia)

  const getSum = (total, num) => {
    return total + num
  }

  return (
    <div>
      yhteensä {tehtavaMaarat.reduce(getSum)} tehtävää
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      {props.osat.map((osa, id) => <Osa key={osa.id}
        nimi={osa.nimi} tehtavia={osa.tehtavia}/>)}
      <Yhteensa osat={props.osat} />
    </div>
  )
}

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko teksti={props.kurssi.nimi} />
      <Sisalto osat={props.kurssi.osat}/>
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    id: 1,
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      },
      {
        nimi: 'Redux',
        tehtavia: 7,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
