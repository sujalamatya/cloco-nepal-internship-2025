import React, { useState } from "react";
import Button from "./Button";

export default function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [popupValue, setPopupValue] = useState<string>("");

  function addTask(newTask: string) {
    if (newTask.trim() !== "" && !tasks.includes(newTask)) {
      setTasks((t) => [...t, newTask]);
    }
  }

  function editTask(index: number, updatedTask: string) {
    if (updatedTask.trim() !== "") {
      setTasks((prevTasks) =>
        prevTasks.map((task, i) => (i === index ? updatedTask : task))
      );
    }
  }

  function deleteTask(index: number) {
    const userResponse = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (userResponse) {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }
  }

  function moveTaskUp(index: number) {
    if (index > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [
          updatedTasks[index - 1],
          updatedTasks[index],
        ];
        return updatedTasks;
      });
    }
  }

  function moveTaskDown(index: number) {
    if (index < tasks.length - 1) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [
          updatedTasks[index + 1],
          updatedTasks[index],
        ];
        return updatedTasks;
      });
    }
  }

  function openAddPopup() {
    setEditIndex(null); // Reset edit index
    setPopupValue(""); // Clear popup value
    setIsPopupOpen(true); // Open popup
  }

  function openEditPopup(index: number) {
    setEditIndex(index); // Set edit index
    setPopupValue(tasks[index]); // Set popup value to the current task
    setIsPopupOpen(true); // Open popup
  }

  function handlePopupSubmit(value: string) {
    if (editIndex !== null) {
      // If editing, update the task
      editTask(editIndex, value);
    } else {
      // If adding, add a new task
      addTask(value);
    }
    setIsPopupOpen(false); // Close popup
  }

  return (
    <div className="to-do-list">
      <h1>ToDo List</h1>
      <button className="add-button" onClick={openAddPopup}>
        Add Task
      </button>

      {isPopupOpen && (
        <TaskPopup
          value={popupValue}
          onSubmit={handlePopupSubmit}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <Button
              className="edit-button"
              functionName={() => openEditPopup(index)}
              label="Edit"
            />
            <Button
              className="delete-button"
              label="Delete"
              functionName={() => deleteTask(index)}
            />
            <Button
              className="move-button"
              functionName={() => moveTaskUp(index)}
              label="↑"
            />
            <Button
              className="move-button"
              functionName={() => moveTaskDown(index)}
              label="↓"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

// TaskPopup Component (Reusable for Add and Edit)
function TaskPopup({
  value,
  onSubmit,
  onClose,
}: {
  value: string;
  onSubmit: (value: string) => void;
  onClose: () => void;
}) {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      onSubmit(inputValue);
      setInputValue(""); // Clear input after submission
    } else {
      alert("Please enter a task!");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{value ? "Edit Task" : "Add a New Task"}</h2>
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>{value ? "Save" : "Add"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
