import React from 'react'

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
      <Otsikko teksti={props.nimi} />
      <Sisalto osat={props.osat}/>
    </div>
  )
}

export default Kurssi
