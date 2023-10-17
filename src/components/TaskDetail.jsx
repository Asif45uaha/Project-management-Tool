import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";
import './TaskDetail.css'
const TaskDetail = ({ users }) => {
    const { id } = useParams()
    console.log(id);
    const [task, setTask] = useState({})
    const [val, setVal] = useState("")
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const docRef = doc(db, "Tasks", id);
                const docSnap = await getDoc(docRef);
                setTask(docSnap.data())
                setVal(docSnap.data().task)
                console.log(docSnap.data());
            } catch (error) {
                console.log(error);
            }
        }
        fetchTask()
    }, [])
    // console.log(status);
    const updateDocument = async () => {
        try {
            const docRef = doc(db, "Tasks", id);
            const data = {
                task: val,
                userId: task?.userId,
                status: status
            };
            await updateDoc(docRef, data)
            console.log("Doc Updated Success");
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="td-container">
            <div className="td-1">
                <div>User: {users?.map((user, index) => <p key={index}>{user.id === task.userId ? `${user.userName}` : ""}</p>)}</div>
                <p>User ID: {task?.userId}</p>
                <p>Task ID: {id}</p>
            </div>
            <div className="td-2">
                <input type="text" value={val} onChange={(ev) => setVal(ev.target.value)} />
            </div>
            <div className="td-3">
                <input type="checkbox" value={status === true ? "checked" : "unchecked"} onChange={() => setStatus(!status)} />
                <p>Completed?</p>
            </div>
            <div className="td-4">
                <button onClick={updateDocument}>Save</button>
                <button onClick={() => navigate("/")}>Back</button>
            </div>
        </div>
    )
}
export default TaskDetail