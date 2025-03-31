import React, { useEffect, useState } from 'react'
import { db } from '../services/firebase.config'
import { addDoc, collection, deleteDoc, doc, getDocs, runTransaction, query, orderBy, serverTimestamp } from 'firebase/firestore'
import EditTask from './EditTask'

const Task = () => {

  const [tasks, setTasks] = useState([])
  const [createTask, setCreateTask] = useState("")

  const [checked, setChecked] = useState([])

  const collectionRef = collection(db, "tasks")

  const sort = 'desc' // 'asc' for ascending order, 'desc' for descending order

  useEffect(() => {
    const getTasks = async () => {

      //Get tasks based on entry time in the databse
      const q = query(collectionRef, orderBy('timestamp', sort))

      const data = await getDocs(q)
      let tasksData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setTasks(tasksData)
      setChecked(tasksData)
    }
    getTasks().catch((error) => {
      console.log(error);
    })
  }, [])

  //Add Task Handler
  const submitTask = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collectionRef, {task: createTask, isChecked: false, timestamp: serverTimestamp()})
      window.location.reload()
    }
    catch (error) {
      console.log(error)
    }
    console.log(createTask);
  }


  const deleteTask = async (id) => {
    try {
      const userConfirmed = window.confirm("Are you sure you want to delete this task?");
      if (!userConfirmed) {
        // If the user clicks "Cancel," exit the function
        return;
      }
      const documentRef = doc(db, "tasks", id)
      await deleteDoc(documentRef) 
      window.location.reload()
    }
    catch (error) {
      console.log(error)
    }
  }

  const checkBoxHandler = async (e) => {
    // console.log(e.target.name)
    setChecked(state =>{
        const index = state.findIndex(checkbox => checkbox.id.toString() === e.target.name)

        let newState = state.slice()

        newState.splice(index, 1, {
            ...state[index],
            isChecked: !state[index]?.isChecked
        })
        setTasks(newState)
        return newState
    })

    //Persisting the checkbox state to the database
    try{
        const docRef = doc(db, "tasks", e.target.name)
        await runTransaction(db, async (transaction) => {
            const taskDoc = await transaction.get(docRef)
            if(!taskDoc.exists()){
                throw "Document does not exist!"
            }
            const newValue = !taskDoc.data().isChecked
            transaction.update(docRef, {isChecked: newValue})
        })
        console.log("Task completion Submitted successfully!")
    }
    catch (error) {
        console.log("Transaction failed: ", error)

    }

  }
  console.log("tasks", tasks);

  return (
    <>
        <div className="container">
            <div className="row col-md-12">
                <div className="card card-white">
                    <div className="card-body">

                    {/* Modal Button */}
                    <button type="button" className="btn btn-primary add-modal" data-bs-toggle="modal" data-bs-target="#addTask">
                    Add Task
                    </button>
                    


                        { /* Display Task List From DB with options to edit or delete */}
                        {tasks.map(({ task, id, isChecked, timestamp }) =>
                        <div className="todo-list" key={id}>
                            <div className="todo-item">
                                <hr />
                                <span className={`${isChecked === true ? 'done' : ''}`}>
                                    <div className="checker">
                                        <span>
                                            <input type="checkbox" defaultValue={isChecked} onChange={(e) => checkBoxHandler(e)} name={id}></input>
                                        </span>
                                    </div>
                                    {task} <br />
                                </span>
                                <i className="timestamp">{ new Date(timestamp.seconds * 1000).toLocaleString() }</i>
                                <EditTask id={id} task={task}/>
                                <button type="button" className="btn btn-danger float-end" onClick={() => deleteTask(id)}>Delete</button>
                            </div>
                        </div>
                        )}

                    </div>
                </div>
            </div>
        </div>



        {/* Modal */}
        <div className="modal fade" id="addTask" tabIndex="-1" aria-labelledby="addTaskLabel" aria-hidden="true">
        <div className="modal-dialog">
            <form onSubmit={submitTask} className="d-flex">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="addTaskLabel">Add New Task</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                
                <input type="text" className="form-control" placeholder="Add a Task" onChange={e => setCreateTask(e.target.value)}></input>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Submit Task</button>
            </div>
            </div>
            </form>
        </div>
        </div>
    </>
  )
}

export default Task