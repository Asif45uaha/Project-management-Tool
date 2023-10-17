import { collection, onSnapshot, doc, getDoc, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../Firebase"

import "./TaskList.css"
import { useNavigate } from "react-router-dom"
const TaskList = ({ users }) => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "Tasks"), (querySnapShot) => {
            const documents = querySnapShot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setTasks(documents)
            return () => unsub()
        })
    }, [])

    console.log(tasks);
    const deleteTask = async (id) => {
        try {
            const docRef = doc(db, "Tasks", id)
            await deleteDoc(docRef)
            const restOfTasks = tasks.filter((task) => task.id !== id)
            setTasks(restOfTasks)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="tl-container">
            <h3>Task List</h3>
            <h5>No OF Tasks: {tasks?.length}</h5>
            {
                tasks?.map((task, index) => <div className="tl-wrapper" key={index}>
                    <div onClick={() => navigate(`/${task?.id}`)}>
                        <div className="tl-user">User:{users?.map((user, index) => <p key={index}>{user.id === task.userId ? `${user.userName}` : ""}</p>)}</div>
                        <p>Task Allocated: {task?.task}</p>
                        <p>Status : {task?.status === true ? "Completed" : "In Progress"}</p>
                    </div>
                    <div>
                        <button onClick={() => deleteTask(task?.id)} style={{ marginTop: "10px", borderRadius: 5, padding: "7px 5px", backgroundColor: "crimson", color: "white", border: "none", outline: "none" }}>
                            Delete
                        </button>
                    </div>

                </div>)
            }
        </div>
    )
}
export default TaskList