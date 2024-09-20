const Note = (prop) => {
    console.log(prop);
    
    return (
      <li>{prop.note.content}</li>
    )
  }

export default Note