import { useState } from 'react'

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
        <button onClick={()=>{handleGood()}}> good </button>
        <button onClick={()=>{handleNeutral()}}> neutral </button>
        <button onClick={()=>{handleBad()}}> bad </button>
      </div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(1*good+(-1)*bad) / all}</p>
      <p>positive {(good*100) / all}</p>
    </div>
  )
}

export default App