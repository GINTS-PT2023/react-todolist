import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || []
  })
  const [editIndex, setEditIndex] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    if (!task.trim()) {
      return
    }

    if (editIndex !== null) {
      setTasks(
        tasks.map((item, index) =>
          index === editIndex ? task : item
        )
      )

      setEditIndex(null)
    } else {
      setTasks([...tasks, task])
    }

    setTask("")
  }

  function handleDelete(index) {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  function handleEdit(index) {
    setTask(tasks[index])
    setEditIndex(index)
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task-input">Task </label>

          <input
            type="text"
            id="task-input"
            name="task-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit">
            {editIndex !== null ? "Update" : "Create"}
          </button>
        </div>
      </form>

      <div>
        <ul id="task-list">
          {tasks.map((tasko, index) => (
            <li key={index}>
              {tasko}

              <button onClick={() => handleDelete(index)}>
                Delete
              </button>

              <button onClick={() => handleEdit(index)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
