import { useState } from 'react'

const StatisticLine = ({text, value,symbol}) => <tr><td>{text}</td><td>{value}{symbol}</td></tr> 


const Statistics = (props) => {
  if(props.all === 0) return (
    <p>No feedback given</p>
  )
  return(
    <table>
      <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.all} />
      <StatisticLine text="average" value ={(1*props.good+(-1)*props.bad) / props.all} />
      <StatisticLine text="positive" value ={(props.good*100) / props.all} symbol="%"/>
      </tbody>
    </table>
  )
}

const Button = ({func,text}) => <button onClick={func}> {text}  </button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () =>{
    console.log("setting good ...")
    setGood(good+1);
    setAll(all+1);
  }
  const handleNeutral = () =>{
    console.log("setting neutral ...")
    setNeutral(neutral+1);
    setAll(all+1);
  }
  const handleBad = () =>{
    console.log("setting bad ...")
    setBad(bad+1);
    setAll(all+1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button func= {()=>handleGood()} text = {"good"}/>
        <Button func= {()=>handleNeutral()} text = {"neutral"}/>
        <Button func= {()=>handleBad()} text = {"bad"}/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  )
}

export default App