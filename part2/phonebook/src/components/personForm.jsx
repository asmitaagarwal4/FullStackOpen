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

const Persons=({persons,deletePerson})=>{
  return(
    <div>
      {persons.map((person)=><Person key={person.name} person={person} deletePerson={()=>deletePerson(person)}/>)}
    </div>
  )
}

const Person=({person,deletePerson})=>{
  return(
    <div>
    <p>{person.name} {person.number} <button onClick={deletePerson}> delete </button></p>
    </div>
  )
}

export default{PersonForm,Persons}