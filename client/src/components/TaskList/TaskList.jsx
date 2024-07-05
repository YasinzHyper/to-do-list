import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

function TaskList(props) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post("/tasks", {
        title: inputs.title,
        description: inputs.description,
        completed: false,
        // categoryId: inputs.category,
      });
      navigate("/");
      // console.log(res);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-4 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="mb-4">
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name="title"
            id="title"
            value={props.newTask}
            onChange={(e) => props.setNewTask(e.target.value)}
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
          <button
              // onClick={handleAdd}
            className="mt-2 w-full bg-teal-600 text-white p-2 rounded"
          >
            Add
          </button>
        </form>
        {error && <span>{error}</span>}
      </div>
      <ul>
        {props.data.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            {props.isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={data.title}
                  id="title"
                  name="title"
                  //   onBlur={(e) => handleEdit(data.id, e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  defaultValue={data.description}
                  id="description"
                  name="description"
                  //   onBlur={(e) => handleEdit(data.id, e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button
                  //   onClick={() => handleEdit(data.id, data.text)}
                  className="ml-2 bg-green-500 text-white p-2 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <div>
                  <button
                    // onClick={() =>
                    //   setTask(
                    //     datas.map((t) =>
                    //       t.id === data.id ? { ...t, isEditing: true } : t
                    //     )
                    //   )
                    // }
                    className="mr-2 bg-yellow-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    // onClick={() => handleDelete(data.id)}
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
