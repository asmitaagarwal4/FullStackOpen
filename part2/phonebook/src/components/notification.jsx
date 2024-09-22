const Notification = ({ errorMessage, doneMessage }) => {
  if (errorMessage === null && doneMessage===null) {
    console.log("notification returning null")
    return null
  }

  else if(errorMessage === null && doneMessage!==null) {
    console.log("notification returning null 1")
    return (
    <div className='done'>
    {doneMessage}
    </div>
  )}

  else if(errorMessage !== null && doneMessage===null) {
    console.log("notification returning null 2")
    return (
    <div className='error'>
    {errorMessage}
    </div>
  )}
  else{
    console.log("notification returning null 3")
  return (
    <>
    <div className='error'>
      {errorMessage}
    </div>
    <div className='done'>
      {doneMessage}
    </div>
    </>
  )}
}

export default Notification