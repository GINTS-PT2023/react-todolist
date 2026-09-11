import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("")

  function handleSubmit (e){
    e.preventDefault();
    setTasks([...tasks, task]);
    setTask("")
  }

  function handleDelete(index){
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task-input">Task </label>
          <input type="text" id='task-input' name='task-input' value={task} onChange={(e) => setTask(e.target.value)}/>
          <button type='submit'>Create</button>
        </div>
      </form>

      <div>
        <ul id="task-list">
          {tasks.map((tasko, index) => (
            <li key={index}>{tasko} <button onClick={() => handleDelete(index)} >Delete</button></li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
