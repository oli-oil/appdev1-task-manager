import { collection, doc, getDocs, deleteDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'
import { db } from './firebase'
import './App.css'

function App() {
  //fetch
  const [tasks, setTasks] = useState([]);

  //add 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  //docs collection 
  const fetchTasks = async ()=> {
    const collectionRef = collection(db, 'tasks');
    const querySnapshot = await getDocs(collectionRef);
    const tasks = querySnapshot.docs.map((task) => ({
      id: task.id,
      ...task.data() 
    }))
    setTasks(tasks)
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  //delete and remove
  const deleteTask = async (id) => {

    const docRef = doc(db, 'tasks', id)
    await deleteDoc(docRef)

    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id))
  }

  // Add
  const addTask = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, 'tasks');
    await addDoc(collectionRef, {
      title: title,
      body: body,
      status: 'pending'
    })
    setTitle('')
    setBody('')
    alert('Task added')
  }

  return (
    <>
      {/*ADDING TASKS COMPONENT*/}
      <div className="formStyle"> 

        <h3>Add Task</h3>

        <form onSubmit={addTask}>
          <input 
            type="text" 
            name="title" 
            id="title" 
            placeholder="Title" 
            value={title} required 
            onChange={(e) => setTitle(e.target.value)}/>
          
          <textarea 
            name="desc" 
            id="desc" 
            placeholder="Description" 
            value={body} required 
            onChange={(e) => setBody(e.target.value)}>
          </textarea>
          
          <button type="submit" onClick={() => {setTimeout(()=> {window.location.reload()}, 1500)}}>Add task</button>
        
        </form>
        
      </div>

      {
        tasks.map((task) => (
          <div key={task.id}> 
            <div>
              Task title: {task.title} 
            </div>
            <div>
              Task body: {task.body} 
            </div>
            <div>
              Task status: {task.status} 
            </div>
            <button onClick={() => deleteTask(task.id)}>
              Delete task
            </button>
          </div>
          
        ))
      }
    </>
  )
}

export default App