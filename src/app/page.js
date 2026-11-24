"use client";

import AddTodo from "@/components/AddTodo";
import Filters from "@/components/Filters";
import TodoList from "@/components/TodoList";
import TaskImportExport from "@/components/TaskImportExport";
import Pagination from "@/components/Pagination";
import CalendarView from "@/components/Calendar";
import useTodos from "@/hooks/useTodos";
import { useState } from "react";

export default function Home() {
  const {
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
  } = useTodos();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [viewMode, setViewMode] = useState("list");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.description
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "incomplete" && !task.completed);

    return matchesSearch && matchesStatus;
  });

  const sortedTasks = [...filteredTasks];

  if (sortOrder !== null) {
    sortedTasks.sort((a, b) => {
      //Null checks for dueDate
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      if (sortOrder === "asc") {
        // Will return a negative number if a.dueDate is earlier than b.dueDate,
        // which means a will come before b in the sorted array.
        return a.dueDate.localeCompare(b.dueDate);
      }

      // logic for sortOrder === "desc"
      // Will return a negative number if b.dueDate is earlier than a.dueDate
      return b.dueDate.localeCompare(a.dueDate);
    });
  }

  const totalPages = Math.max(1, Math.ceil(sortedTasks.length / itemsPerPage));

  const safePage = Math.min(currentPage, totalPages);

  const paginatedTasks = sortedTasks.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const canDrag =
    sortOrder === null && searchText.trim() === "" && statusFilter === "all";

  function importTasks(importedTasks) {
    appendTasks(importedTasks);
    setCurrentPage(1);
  }

  function changePageSize(pageSize) {
    setItemsPerPage(pageSize);
    setCurrentPage(1);
  }

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">My Todo App</h1>
      </header>

      <div className="card">
        <AddTodo
          newTask={newTask}
          onTaskChange={setNewTask}
          onAddTask={addTask}
          dueDate={dueDate}
          onDueDateChange={setDueDate}
          category={category}
          onCategoryChange={setCategory}
        />

        <TaskImportExport
          filteredTasks={sortedTasks}
          onImportTasks={importTasks}
        />

        <Filters
          onSearchChange={setSearchText}
          onStatusFilterChange={setStatusFilter}
          onSortOrderChange={setSortOrder}
          searchText={searchText}
          statusFilter={statusFilter}
          sortOrder={sortOrder}
        />

        <div className="view-switch">
          <button
            type="button"
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <i className="bi bi-list-task"></i>
            List View
          </button>

          <button
            type="button"
            className={`view-btn ${viewMode === "calendar" ? "active" : ""}`}
            onClick={() => setViewMode("calendar")}
          >
            <i className="bi bi-calendar3"></i>
            Calendar View
          </button>
        </div>

        {viewMode === "list" ? (
          <>
            <TodoList
              tasks={paginatedTasks}
              editingId={editingId}
              editText={editText}
              onTextChange={setEditText}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onToggle={toggleTaskCompletion}
              onEdit={startEditing}
              onDelete={deleteTask}
              onMoveTask={moveTask}
              canDrag={canDrag}
              editDueDate={editDueDate}
              editCategory={editCategory}
              onDueDateChange={setEditDueDate}
              onCategoryChange={setEditCategory}
            />

            <Pagination
              currentPage={safePage}
              totalTasks={sortedTasks.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setItemsPerPage(size);
                setCurrentPage(1);
              }}
            />
          </>
        ) : (
          <CalendarView
            tasks={tasks}
            editingId={editingId}
            editText={editText}
            editDueDate={editDueDate}
            editCategory={editCategory}
            onTextChange={setEditText}
            onDueDateChange={setEditDueDate}
            onCategoryChange={setEditCategory}
            onSave={saveEdit}
            onCancel={cancelEdit}
            onToggle={toggleTaskCompletion}
            onEdit={startEditing}
            onDelete={deleteTask}
          />
        )}
      </div>
    </main>
  );
}
