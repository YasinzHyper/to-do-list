import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

function TaskList(props) {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // const [newTask, setNewTask] = useState(null);
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post("/tasks", {
        title: inputs.title,
        description: inputs.description,
        categoryId: inputs.categoryId,
        completed: false,
        // categoryId: inputs.category,
      });
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      navigate("/");
      // console.log(res);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiRequest.delete("/tasks/" + id);
      navigate("/");
      console.log("Task deleted successfully");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const handleEdit = async (id, value) => {
    try {
      const res = await apiRequest.put(`/tasks/${id}`, {
        ...value,
      });
      navigate("/");
      console.log("Task edited successfully");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="mb-4">
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name="title"
            id="title"
            // value={props.newTask}
            // onChange={(e) => props.setNewTask({newTask, title: e.target.value})}
            className="border p-2 w-full rounded mb-2"
            placeholder="Add a new to-do"
          />
          <input
            type="text"
            id="description"
            name="description"
            //   onBlur={(e) => handleEdit(data.id, e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Add a description"
          />
          <select
            // onChange={handleCategorySelectChange}
            name="categoryId"
            className="mt-2 px-2 py-1 border rounded "
          >
            <option value={1}>Select Category</option>
            {props.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            // onClick={handleAdd}
            className="mt-2 w-full bg-teal-600 text-white p-2 rounded"
          >
            Add
          </button>
        </form>
        {error && <span>{error}</span>}
      </div>
      {props.data.length === 0 ? <p>No tasks added yet!</p> : null}
      <ul>
        {props.data.map((task) => (
          <li
            key={task.id}
            // id={task.id + "li"}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={task.title}
                  id={"new-title-" + task.id}
                  name="new-title"
                  //   onBlur={(e) => handleEdit(data.id, e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  defaultValue={task.description}
                  id={"new-description-" + task.id}
                  name="new-description"
                  //   onBlur={(e) => handleEdit(data.id, e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => {
                    isEditing ? setIsEditing(false) : setIsEditing(true);
                    const newTitle = document.getElementById(
                      "new-title-" + task.id
                    ).value;
                    const newDescription = document.getElementById(
                      "new-description-" + task.id
                    ).value;
                    handleEdit(task.id, {
                      title: newTitle,
                      description: newDescription,
                    });
                  }}
                  className="ml-2 bg-green-500 text-white p-2 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-4 flex-col justify-start items-start">
                  <h2 className="font-semibold text-l">{task.title}</h2>
                  <hr />
                  <p className="text-ellipsis text-start">{task.description}</p>
                  <p className="text-start text-sm text-gray-400">
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex align-center justify-end">
                  <button
                    onClick={() =>
                      isEditing ? setIsEditing(false) : setIsEditing(true)
                    }
                    className="mr-2 bg-yellow-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
