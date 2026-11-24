"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TodoList from "@/components/TodoList";

export default function CalendarView({
  tasks,
  editingId,
  editText,
  editDueDate,
  editCategory,
  onTextChange,
  onDueDateChange,
  onCategoryChange,
  onSave,
  onCancel,
  onToggle,
  onEdit,
  onDelete,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const selectedDateString = formatDate(selectedDate);

  const selectedTasks = tasks.filter(
    (task) => task.dueDate === selectedDateString,
  );

  function renderTile({ date, view }) {
    if (view !== "month") return null;

    const dateString = formatDate(date);

    const tasksOnDate = tasks.filter((task) => task.dueDate === dateString);

    if (tasksOnDate.length === 0) return null;

    return (
      <div className="calendar-tile-content">
        <span className="calendar-task-dot"></span>
        <span className="calendar-task-count">{tasksOnDate.length}</span>
      </div>
    );
  }

  return (
    <div className="calendar-view">
      <h2 className="calendar-title">Task Calendar</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={renderTile}
        calendarType="gregory"
        minDetail="month"
        maxDetail="month"
      />

      <div className="calendar-task-panel">
        <div className="calendar-panel-header">
          <h3>Tasks for {selectedDateString}</h3>

          <span className="calendar-panel-summary">
            {selectedTasks.length} tasks ·{" "}
            {selectedTasks.filter((task) => !task.completed).length} active
          </span>
        </div>

        {selectedTasks.length === 0 ? (
          <div className="calendar-empty">
            <i className="bi bi-calendar-check"></i>
            <p>No tasks scheduled for this date.</p>
          </div>
        ) : (
          <TodoList
            tasks={selectedTasks}
            editingId={editingId}
            editText={editText}
            editDueDate={editDueDate}
            editCategory={editCategory}
            onTextChange={onTextChange}
            onDueDateChange={onDueDateChange}
            onCategoryChange={onCategoryChange}
            onSave={onSave}
            onCancel={onCancel}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            canDrag={false}
            showDragHandle={false}
          />
        )}
      </div>
    </div>
  );
}
