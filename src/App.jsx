import { useEffect, useState } from "react";
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";
import { Routes, Route } from 'react-router-dom'
import TaskDetail from "./components/TaskDetail";
function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      setUsers(documents);

    });
    return () => unsub()
  }, [])
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero users={users} setUsers={setUsers} />} />
        <Route path="/:id" element={<TaskDetail users={users} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
