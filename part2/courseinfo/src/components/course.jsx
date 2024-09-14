const Header = ({ heading }) => <h2>{heading}</h2>

const Total = ({ parts }) => {
  return(
    <p><b>total of {parts.reduce((sum, part)=> sum+=part.exercises ,0)} exercises</b></p>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>


const Content = ({ parts }) => {
  return(
    parts.map(part => <Part key={part.id} part={part} />)
   )
}

const Course = ({cours}) => {
  
  return (
    <div>
      <Header heading={cours.name} />
      <Content parts={cours.parts} />
      <Total parts={cours.parts} />
    </div>
  )
}

export default Course