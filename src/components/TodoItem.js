export default function TodoItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  dragRef,
  dragHandleRef,
  isDragging = false,
  canDrag = false,
  showDragHandle = true,
}) {
  const categoryClass =
    task.category === "Work"
      ? "category-work"
      : task.category === "Personal"
        ? "category-personal"
        : task.category === "Urgent"
          ? "category-urgent"
          : "category-none";

  return (
    <li
      ref={dragRef}
      className={`todo-item ${task.completed ? "todo-completed" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={`todo-item-row ${!showDragHandle ? "without-drag" : ""}`}>
        {showDragHandle && (
          <button
            type="button"
            ref={dragHandleRef}
            className="todo-drag-handle"
            disabled={!canDrag}
            aria-label="Drag to reorder"
            title="Drag to reorder"
          >
            <i className="bi bi-grip-vertical"></i>
          </button>
        )}

        <input
          type="checkbox"
          className="form-check-input todo-checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span className="todo-description">{task.description}</span>

        <span className="todo-date">
          {task.dueDate ? (
            <>
              <i className="bi bi-calendar3"></i>
              {task.dueDate}
            </>
          ) : (
            "—"
          )}
        </span>

        <div className="todo-category-cell">
          <span className={`todo-category ${categoryClass}`}>
            {task.category}
          </span>
        </div>

        <div className="todo-actions">
          <button
            type="button"
            className="btn todo-edit-btn"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            title="Edit task"
          >
            <i className="bi bi-pencil"></i>
          </button>

          <button
            type="button"
            className="btn todo-delete-btn"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            title="Delete task"
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </li>
  );
}
