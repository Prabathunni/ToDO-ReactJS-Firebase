import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import ToDoLists from "./Components/ToDoLists";
import {addDoc, collection, getDocs} from "firebase/firestore"
import { db } from "./fireBase";
import Footer from "./Components/Footer";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [users,setUsers] = useState([])

  // connecting with the collection of database "user"
  const userCollectionRef = collection(db,"user")


  // Fetching the data from firebase database
  useEffect(()=>{

    const getUsers = async()=>{

      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) =>({...doc.data(), id:doc.id})));
        
    }
    getUsers()

  }, [])


  // Adding to firebase database
  const [tasktodo,setTasktodo] = useState("")

  const addTask = async() =>{

    if (tasktodo && tasktodo.trim() !== "") {
      try {
        await addDoc(userCollectionRef, { task: tasktodo });
        alert("Task added successfully");
      } catch (error) {
        console.error("Error adding task: ", error);
        alert("Failed to add task");
      }
    } else {
      alert("Please provide an input");
    }
  }


  return (
    <>
      <Header />


      <div className="bg-image row" style={{padding:"100px"}}>
        <div className="col-lg-3 "></div>
        <div className="col-lg-5 w-50">
          <h1 className="text-center bg-secondary text-light rounded p-3">To Do</h1>
          <div className="p-2 d-flex justify-content-between shadow-sm rounded">
            <h3>Tasks</h3>
            <Button className="btn btn-success" onClick={handleShow}>
              <i class="fa-solid fa-plus px-2"></i>Add
            </Button>
          </div>
          <ToDoLists users={users}/>
        </div>




        <div className="col-lg-4"></div>
      </div>


      

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="task here! "
            className="mb-3"
          >
            <Form.Control type="email" placeholder="add task" onChange={(e)=>setTasktodo(e.target.value)} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() =>{addTask();handleClose()}}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer/>
    </>
  );
}

export default App;
