import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([ 
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 } ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName= (event) =>{
    console.log(event.target)
    event.preventDefault()

    const nameObject= {
      name:newName,
      number:newNumber
    }
    
    const included= persons.reduce((acc,person)=>{
      if(JSON.stringify(nameObject)===JSON.stringify(person)) acc=true
      return acc
      } ,
      false)

    console.log(included)  

    included
    ?alert(`${newName} is alredy added`)
    :setPersons(persons.concat(nameObject)) 
    
    
    console.log(persons)

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange=(event)=>{
    console.log(event.target)
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
    console.log(event.target)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} />
      </div>

    </div>
  )
}

const PersonForm =({newName,newNumber,addName,handleNameChange,handleNumberChange})=>{
  return(
      <form onSubmit={addName}>
      <div> name: <input id="name" value= {newName} onChange={handleNameChange} /> </div>
      <div> number: <input id="number" value= {newNumber} onChange={handleNumberChange} /> </div>
      <div>
        <button type="submit">add</button>
      </div> 
    </form>
  )
}

const Persons=({persons})=>{
  return(
    <div>
      {persons.map((person)=><Person key={person.name} person={person}/>)}
    </div>
  )
}

const Person=({person})=>{
  return(
    <p>{person.name} {person.number}</p>
  )
}

export default App
