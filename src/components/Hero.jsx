import "./Hero.css"
import pic_1 from '../images/pic_1.jpg'
import { useState } from "react"
import { addDoc, collection, deleteDoc, doc, } from 'firebase/firestore'
import { db } from "../Firebase"
import TaskList from "./TaskList"
const Hero = ({ users, setUsers }) => {
    const [userName, setUserName] = useState("")
    const [task, setTask] = useState("")
    const [option, setOption] = useState("")
    const addUser = async () => {
        try {
            const dbRef = collection(db, "users")
            await addDoc(dbRef, {
                userName
            })
            console.log("user Add Success");
            setUserName("")

        } catch (error) {
            console.log(error);
        }
    }

    // console.log(users);
    const AddTask = async () => {
        try {
            const dbRef = collection(db, "Tasks")
            await addDoc(dbRef, {
                task: task,
                userId: option,
            })
            console.log("task Add Success");
            setTask("")
        } catch (error) {
            console.log(error);
        }
    }
    const delUser = async () => {
        try {
            const dbRef = doc(db, "users", option)
            await deleteDoc(dbRef)
            const restOfUsers = users.filter((user) => user?.id !== option)
            setUsers(restOfUsers)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="hero-container">
                <div className="hero-left">
                    <h4>Project Management System</h4>
                    <img src={pic_1} alt="error" />
                </div>
                <div className="hero-right">
                    <div className="hr-first">
                        <input type="text" id="user" placeholder="user name" onChange={(e) => setUserName(e.target.value)} value={userName} />
                        <button onClick={addUser}>Add User</button>
                    </div>
                    <div className="hr-second">
                        <select onChange={(ev) => setOption(ev.target.value)}>
                            <option value="">select a user</option>
                            {
                                users?.map((user, index) => <option value={user?.id} key={index}>{user?.userName}</option>)
                            }
                        </select>
                        <button onClick={() => delUser(option)}>Delete User</button>
                    </div>
                    <div className="hr-third">
                        <input type="text" placeholder="Describe Task" onChange={(ev) => setTask(ev.target.value)} value={task} />
                        <button onClick={AddTask}>Add Task</button>
                    </div>
                </div>
            </div>
            <div>
                <TaskList users={users} />
            </div>
        </>
    )
}
export default Hero