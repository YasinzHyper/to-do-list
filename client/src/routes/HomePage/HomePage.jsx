import { useLoaderData } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import TaskList from "../../components/TaskList/TaskList";
import TaskCategories from "../../components/TaskCategories/TaskCategories";
// import "./HomePage.scss";

function HomePage() {
  const data = useLoaderData();
  //   console.log(data);
  // const [category, setCategory] = useState(data.categories[0]);
  const [tasks, setTasks] = useState(data.tasks);

  async function handleCategoryChange(categoryId) {
    if (categoryId != 1) {
      try {
        // const res = await apiRequest.get("/tasks/category/" + categoryId);
        // setTasks(res.data);
        let filteredTasks = [...data.tasks];
        filteredTasks = filteredTasks.filter((task) => task.categoryId==categoryId);
        setTasks(filteredTasks);
      } catch (error) {
        console.log(error);
      }
    } else {
      setTasks(data.tasks);
    }
  }

  return (
    <>
      <TaskCategories
        onCategoryChange={handleCategoryChange}
        items={data.categories}
      />
      <TaskList data={tasks} categories={data.categories}/>
    </>
  );
}

export default HomePage;
