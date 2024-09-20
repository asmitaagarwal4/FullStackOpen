const handleNameChange=(event)=>{
  console.log(event.target)
  setNewName(event.target.value)
}

const handleNumberChange=(event)=>{
  console.log(event.target)
  setNewNumber(event.target.value)
}

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

const PersonForm =({newName,newNumber})=>{
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


export default PersonForm