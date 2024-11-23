import { useEffect, useState } from 'react'
import comp from './components/personForm'
import services from './services/persons'
import Notification from './components/notification'

/**
 * The main App component that manages the state and behavior of the application.
 */
const App = () => {
  const [persons, setPersons] = useState([]) // State to store the list of persons
  const [newName, setNewName] = useState('') // State to store the new name input
  const [newNumber, setNewNumber] = useState('') // State to store the new number input
  const [errorMessage, setErrorMessage] = useState(null) // State to store error messages
  const [doneMessage, setDoneMessage] = useState(null) // State to store success messages

  /**
   * useEffect hook to fetch the initial list of persons from the server when the component mounts.
   */
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

  /**
   * Event handler to add a new name and number to the list of persons.
   * @param {Event} event - The form submit event.
   */
  const addName= (event) =>{
    event.preventDefault()

    const nameObject= {
      name:newName,
      number:newNumber
    }
    
    // Check if the new name already exists in the list of persons
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

  /**
   * Deletes a person from the phonebook.
   *
   * @param {Object} persontbd - The person to be deleted.
   * @param {number} persontbd.id - The ID of the person to be deleted.
   * @param {string} persontbd.name - The name of the person to be deleted.
   *
   * @returns {void}
   *
   * Prompts the user for confirmation before deleting the person.
   * If confirmed, it calls the deleteName service to delete the person from the server.
   * Updates the state with the new list of persons after deletion.
   * If the person was already deleted from the server, it sets an error message and updates the state.
   */
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
        <comp.Persons persons={persons} deletePerson={deletePerson}/> // The Persons component that displays the list of persons
      </div>
    </div>
  )
}

export default App
