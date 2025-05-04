import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { db } from "../fireBase";


function ToDoLists({ users }) {

  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');


  const [loading,setLoading] = useState(false)

  // editing the task 
  const saveChanges = async (id, currentTask) => {

    setLoading(true);
    try{
      if (editedText.trim() === currentTask.trim()) {

        setEditingId(null);
        alert("Nothing Changed...");
  
      } else {
        const userDoc = doc(db, "user", id)
        const newTask = { task: editedText }
        await updateDoc(userDoc, newTask)
        setEditingId(null)
  
      }
  
    } finally{
      setLoading(false);
    }

  };

  // delete
  const deleteTask = async (id) => {

    const userDoc = doc(db, "user", id)
    await deleteDoc(userDoc)
    alert("Task Deleted!")
  }


  return (

    <>

      <div className="mt-5" style={{ maxHeight: "300px", overflowY: "auto" }}>
        <table className="table table-bordered mt-5 text-center align-middle shadow-sm">
          <thead className="table-success sticky-top">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task Name</th>
              <th></th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>

            {
            loading?           
              <button>
                 <span className="spinner-border spinner-border-sm me-2" role="status" />
              </button>
            
          
            : (

              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
  
                  <td>
                    {editingId === user.id ? (
                      <Form.Control
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      user.task
                    )}
                  </td>
  
                  <td>
                    <Form.Check aria-label="Complete task" />
                  </td>
  
                  <td className="d-flex justify-content-around">
                    {editingId === user.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => saveChanges(user.id, user.task)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => {
                            setEditingId(user.id);
                            setEditedText(user.task);
                          }}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button className="btn btn-light btn-sm" onClick={() => deleteTask(user.id)}>
                          <i className="fa-solid fa-trash text-danger"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))


            )
            
          }

            
          </tbody>
        </table>

      </div>



    </>

  );
}

export default ToDoLists;
