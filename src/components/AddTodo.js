import openDatePicker from "../utils/openDatePicker";

export default function AddTodo({
  newTask,
  onTaskChange,
  onAddTask,
  dueDate,
  onDueDateChange,
  category,
  onCategoryChange,
}) {
  return (
    <div className="add-task-card mb-4">
      <h2 className="add-task-title">Add New Task</h2>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control task-input"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => onTaskChange(e.target.value)}
          ></input>
        </div>
        <div className="col-12 col-md-4 col-lg-2">
          <select
            className="form-select task-input"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="col-12 col-md-4 col-lg-2">
          <input
            type="date"
            className="form-control task-input"
            aria-label="Due date"
            value={dueDate}
            onClick={openDatePicker}
            onChange={(e) => onDueDateChange(e.target.value)}
          ></input>
        </div>
        <div className="col-12 col-md-4 col-lg-2">
          <button className="btn add-task-btn w-100" onClick={onAddTask}>
            <i className="bi bi-plus me-1" aria-hidden="true"></i>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
