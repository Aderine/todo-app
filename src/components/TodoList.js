"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableTodoItem from "@/components/DraggableTodoItem";
import EditTodo from "@/components/EditTodo";

export default function TodoList({
  tasks,
  editingId,
  editText,
  onTextChange,
  onSave,
  onCancel,
  onToggle,
  onEdit,
  onDelete,
  onMoveTask,
  canDrag,
  editDueDate,
  editCategory,
  onDueDateChange,
  onCategoryChange,
  showDragHandle = true,
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="todo-list">
        {tasks.map((task) =>
          editingId === task.id ? (
            <EditTodo
              key={task.id}
              task={task}
              editText={editText}
              editDueDate={editDueDate}
              editCategory={editCategory}
              onTextChange={onTextChange}
              onDueDateChange={onDueDateChange}
              onCategoryChange={onCategoryChange}
              onSave={onSave}
              onCancel={onCancel}
            />
          ) : (
            <DraggableTodoItem
              key={task.id}
              task={task}
              onMoveTask={onMoveTask}
              canDrag={canDrag}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              showDragHandle={showDragHandle}
            />
          ),
        )}
      </ul>
    </DndProvider>
  );
}
