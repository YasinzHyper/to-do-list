import { useLoaderData } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import TaskList from "../../components/TaskList/TaskList";
// import "./HomePage.scss";

function HomePage() {
  const data = useLoaderData();
//   console.log(data);
  const [newTask, setNewTask] = useState("");
  const isEditing = false;

  

  async function handleEdit() {
    // apiRequest.put();
  }

  async function handleDelete() {

  }

  return (
    <TaskList data={data} newTask={newTask} setNewTask={setNewTask} isEditing={isEditing}/>
  );
}

export default HomePage;
