import React, { useState } from 'react'
import { db } from '../services/firebase.config'
import { updateDoc, doc } from 'firebase/firestore'

const EditTask = ({task, id}) => {
    // console.log(task, id)

    // Initialize updatedTask with the task prop
    const [updatedTask, setUpdateTask] = useState([task])

    const updateTask = async (e) => {
        e.preventDefault()
        try {
            // Update the task in Firestore
            await updateDoc(doc(db, "tasks", id), {task: updatedTask})
            // Optionally, update the UI dynamically instead of reloading
            window.location.reload()
        }
        catch (error) {
            console.log(error)
        }
        console.log(updatedTask)
    }

    return(
        <>

            {/* Modal Button */}
            <button type="button" className="btn btn-primary add-modal float-end mx-3" data-bs-toggle="modal" data-bs-target={`#id${id}`}>
                Edit
            </button>

            {/* Edit Task Modal */}
            <div className="modal fade" id={`id${id}`} tabIndex="-1" aria-labelledby="updateTaskLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="d-flex">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="updateTaskLabel">Edit Task</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <input type="text" className="form-control" placeholder="Update Task" defaultValue={updatedTask} onChange={e =>setUpdateTask(e.target.value)}></input>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={e => updateTask(e)}>Update Task</button>
                </div>
                </div>
                </form>
            </div>
            </div>

        </>
    )
}

export default EditTask