import { collection, doc, getDocs, deleteDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react'
import { database } from './firebase'
import './App.css'

function App() {
  //fetch
  const [tasks, setTasks] = useState([]);

  //add 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  //docs collection 
  const fetchTasks = async ()=> {
    const collectionRef = collection(database, 'tasks');
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

    const docRef = doc(database, 'tasks', id)
    await deleteDoc(docRef)

    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id))
  }

  // Add
  const addTask = async (e) => {
    e.preventDefault();
    const collectionRef = collection(database, 'tasks');
    await addDoc(collectionRef, {
      title: title,
      body: body,
      status: 'pending'
    })
    setTitle('')
    setBody('')
    alert('Task Added!')
  }

  const handleStatus = async (id) => {
    try {
      const itemRef = doc(database, 'tasks', id);
      const currentTask = await getDoc(itemRef);
      const currentStatus = currentTask.data().status;
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'; 

      await updateDoc(itemRef, {
        status: newStatus, 
      });

      setTasks((prevTasks) => 
        prevTasks.map((task)=>
          task.id === id ?  {...task, status: newStatus } : task
        )
      );
    }

    catch (error) {
      console.log(error);
    }

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
          
          <button type="submit" onClick={() => {setTimeout(()=> {window.location.reload()}, 1500)}}> <span> Add task </span> </button>
        
        </form>
        
      </div>

      {
        tasks.map((task) => (
          <div key={task.id} className = "divofdiv"> 
            <div>
              Task Title: {task.title} 
            </div>
            <div>
              Task Description: {task.body} 
            </div>
            <div>
              Task Status 
              <button onClick={() => {handleStatus(task.id)}}>
              {task.status} 
              </button>
            </div>
            <button className = "disr" onClick={() => deleteTask(task.id)}>
              Disregard
            </button>
          </div>
          
        ))
      }
    </>
  )
}

export default App