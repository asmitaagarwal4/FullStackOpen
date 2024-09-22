import { useEffect, useState } from 'react'
import comp from './components/personForm'
import services from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [doneMessage, setDoneMessage] = useState(null)

  useEffect(()=>{
    console.log("effect")
    console.log(persons.length)
    const extra ={
      id: 111,
      name: 'not exist',
      number: '123456789'
    }
  
    services
    .getAll()
    .then((initial)=>{
      console.log(initial)
      setPersons(initial)
    })
  }, [])

  const addName= (event) =>{
    event.preventDefault()

    const nameObject= {
      name:newName,
      number:newNumber
    }
    
    const included= persons.reduce((acc,person)=>{
      if(newName===person.name) return person
      } ,
      [])

    console.log(included)  

    if(included!=undefined){
      if(window.confirm(`${newName} is alredy added. Do you want to Replace the old number with the new number?`)){
        const newObj = {...included, number:newNumber}
        console.log(newObj)
        services
          .replace(included,newObj)
          .then((createdObj)=>{
            setPersons(
            persons.map((person)=>{
              if(person.name!==newName) return person
              else return createdObj
            }))
            setDoneMessage(`Modified ${createdObj.name}`)
            setTimeout(() => {
            setDoneMessage(null)
            }, 5000)
          })
      }
    }else{
      services
      .add({newName,newNumber})
      .then((createdObj)=>{
        setPersons(persons.concat(createdObj))
        setDoneMessage(`Added ${createdObj.name}`)
        setTimeout(() => {
          setDoneMessage(null)
        }, 5000)
      })
    }
   
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

  const deletePerson = (persontbd)=>{
    // const toBeDeleted=persons.filter((person) =>{
    //   return person.id===id
    // })
    // console.log(toBeDeleted[0])
    if (window.confirm(`delete ${persontbd.name}?`)) {
      services
      .deleteName(persontbd.id)
      .then((deletedObj)=>{
        alert(`${deletedObj.name} was deleted`)
        const newList= persons.filter((person)=> person.id!==persontbd.id)
        console.log(newList)
        setPersons(newList)
      })
      .catch(()=>{
        setErrorMessage(`${persontbd.name} was already deleted from the server`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
        const newList= persons.filter((person)=> person.id!==persontbd.id)
        console.log(newList)
        setPersons(newList)
        // alert("was not found")
    })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} doneMessage={doneMessage}/>
      <h2>add a new</h2>
      <comp.PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        <comp.Persons persons={persons} deletePerson={deletePerson}/>
      </div>
    </div>
  )
}

export default App
