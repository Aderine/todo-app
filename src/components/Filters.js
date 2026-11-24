export default function Filters({
  onSearchChange,
  onStatusFilterChange,
  onSortOrderChange,
  searchText,
  statusFilter,
  sortOrder,
}) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      <div className="status-buttons">
        <button
          type="button"
          className={`status-btn ${statusFilter === "all" ? "active" : ""}`}
          onClick={() => onStatusFilterChange("all")}
        >
          All
        </button>

        <button
          type="button"
          className={`status-btn ${statusFilter === "incomplete" ? "active" : ""}`}
          onClick={() => onStatusFilterChange("incomplete")}
        >
          Active
        </button>

        <button
          type="button"
          className={`status-btn ${statusFilter === "completed" ? "active" : ""}`}
          onClick={() => onStatusFilterChange("completed")}
        >
          Completed
        </button>
      </div>

      <select
        value={sortOrder ?? ""}
        onChange={(e) => onSortOrderChange(e.target.value || null)}
        className="form-select sort-dropdown"
        aria-label="Sort tasks"
      >
        <option value="">Default order</option>
        <option value="asc">Earliest due date first</option>
        <option value="desc">Latest due date first</option>
      </select>
    </div>
  );
}
