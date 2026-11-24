import openDatePicker from "../utils/openDatePicker";

export default function EditTodo({
  task,
  editText,
  editDueDate,
  editCategory,
  onTextChange,
  onDueDateChange,
  onCategoryChange,
  onSave,
  onCancel,
}) {
  return (
    <li className="todo-item todo-editing">
      <form
        className="todo-edit-row"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(task.id);
        }}
      >
        <input
          type="text"
          className="form-control"
          value={editText}
          onChange={(event) => onTextChange(event.target.value)}
          aria-label="Task description"
          required
        />

        <input
          type="date"
          className="form-control"
          value={editDueDate}
          onClick={openDatePicker}
          onChange={(event) => onDueDateChange(event.target.value)}
          aria-label="Due date"
        />

        <select
          className="form-select"
          value={editCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Category"
        >
          <option value="None">None</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <button
          type="submit"
          className="btn todo-save-btn"
          disabled={!editText.trim()}
        >
          <i className="bi bi-check-lg"></i> Save
        </button>

        <button
          type="button"
          className="btn todo-cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </li>
  );
}
