import axios from 'axios'
const baseUrl= 'http://localhost:3001/persons'


const getAll =() => {
    const request = axios.get(baseUrl)
    const response = request
    return request.then((response)=>response.data)
  }

const add= ({newName,newNumber})=>{
    const newObj={
        name: newName,
        number: newNumber}
    const request= axios.post(baseUrl,newObj)
    return request.then((response)=>response.data)
}

const replace=(included,newObj)=>{
    const request= axios.put(
        `${baseUrl}/${included.id}`,
        newObj
    )
    return request.then((response)=>response.data)
}

const deleteName = (id)=>{
    console.log(`${baseUrl}/${id}`)
    const request= axios.delete(`${baseUrl}/${id}`)
    console.log(request)
    return request.then((response)=>response.data) 
}

export default {getAll,add,deleteName,replace}