import { useEffect, useState } from "react";
import normalizeDueDate from "../utils/normalizeDueDate";

function normalizeTaskDueDate(task) {
  return { ...task, dueDate: normalizeDueDate(task.dueDate) };
}

export default function useTodos() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("None");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editCategory, setEditCategory] = useState("None");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks.map(normalizeTaskDueDate));
        }
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks, isLoaded]);

  function addTask() {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        description: newTask,
        completed: false,
        dueDate: dueDate,
        category: category,
      };
      setTasks((prevTasks) => [...prevTasks, task]);
      setNewTask("");
      setDueDate("");
      setCategory("None");
    }
  }

  function toggleTaskCompletion(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function moveTask(draggedId, targetId) {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];

      const fromIndex = updatedTasks.findIndex((task) => task.id === draggedId);

      const toIndex = updatedTasks.findIndex((task) => task.id === targetId);

      if (fromIndex === -1 || toIndex === -1) {
        return prevTasks;
      }

      const [movedTask] = updatedTasks.splice(fromIndex, 1);

      updatedTasks.splice(toIndex, 0, movedTask);

      return updatedTasks;
    });
  }

  function startEditing(task) {
    setEditingId(task.id);
    setEditText(task.description);
    setEditDueDate(task.dueDate || "");
    setEditCategory(task.category || "None");
  }

  function saveEdit(id) {
    if (editText.trim() === "") {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              description: editText.trim(),
              dueDate: editDueDate,
              category: editCategory,
            }
          : task,
      ),
    );

    cancelEdit();
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
    setEditDueDate("");
    setEditCategory("None");
  }

  function appendTasks(importedTasks) {
    setTasks((prevTasks) => [
      ...prevTasks,
      ...importedTasks.map(normalizeTaskDueDate),
    ]);
  }

  return {
    tasks,
    newTask,
    setNewTask,
    dueDate,
    setDueDate,
    category,
    setCategory,
    editingId,
    editText,
    setEditText,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    moveTask,
    startEditing,
    saveEdit,
    cancelEdit,
    appendTasks,
    editDueDate,
    setEditDueDate,
    editCategory,
    setEditCategory,
  };
}
