function TaskList(props) {
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={props.newTask}
          onChange={(e) => props.setNewTask(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Add a new to-do"
        />
        <button
          //   onClick={handleAdd}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
        >
          Add
        </button>
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
