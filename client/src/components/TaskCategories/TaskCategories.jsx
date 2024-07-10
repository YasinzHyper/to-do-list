import React, { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

function TaskCategories({ onCategoryChange, items }) {
  const [selectedCategory, setSelectedCategory] = useState({
    name: "All",
    id: 1,
  });
  const [categories, setCategories] = useState([
    { name: "All", id: 1 },
    ...items,
  ]);
  const [newCategory, setNewCategory] = useState(false);
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category); // Notify parent component of the category change
    // console.log(selectedCategory);
  };

  const handleAddCategory = async () => {
    const name = document.getElementById("new-category").value;
    const res = await apiRequest.post("/categories", {
      name,
    });
    navigate("/");
    setNewCategory(false);
    // console.log(res)
    setCategories([...categories, res]);
  };

  return (
    <div className="fixed flex w-36 flex-col p-4 bg-gray-900 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Categories</h3>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => {
            handleCategoryChange(category.id);
            setSelectedCategory(category);
          }}
          className={`px-4 py-2 rounded ${
            selectedCategory.id === category.id
              ? "bg-teal-500 text-white text-left shadow-md"
              : " text-gray-400 text-left"
          }`}
        >
          {category.name}
        </button>
      ))}
      <button
        className="self-center mt-2 w-10 px-3 py-2 bg-teal-500 text-white rounded-lg shadow-md"
        onClick={() => {
          setNewCategory(!newCategory);
        }}
      >
        +
      </button>
      {newCategory && (
        <input
          id="new-category"
          type="text"
          placeholder="Add a new category"
          className="mt-2 px-2 py-1 border rounded"
        />
      )}
      {newCategory && (
        <button
          className="self-center mt-2 px-3 py-2 bg-teal-500 text-white rounded-lg shadow-md"
          onClick={() => {
            // setNewCategory(!newCategory);
            handleAddCategory();
          }}
        >
          Add
        </button>
      )}
    </div>
  );
}

export default TaskCategories;
