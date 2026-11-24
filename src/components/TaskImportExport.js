import * as XLSX from "xlsx";

export default function TaskImportExport({ filteredTasks, onImportTasks }) {
  function exportTasks() {
    if (filteredTasks.length === 0) {
      return;
    }

    const exportData = filteredTasks.map((task) => ({
      Task: task.description,
      Status: task.completed ? "Completed" : "Incomplete",
      "Due Date": task.dueDate || "",
      Category: task.category || "None",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Todo Tasks");

    XLSX.writeFile(workbook, "todo-filtered-report.xlsx");
  }

  async function importCSV(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        alert("Please select a CSV file.");
        return;
      }

      const csvText = await file.text();

      const workbook = XLSX.read(csvText, {
        type: "string",
        raw: true,
      });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      });

      const importedTasks = rows
        .map((row) => {
          const description = String(row.Task ?? "").trim();
          const status = String(row.Status ?? "")
            .trim()
            .toLowerCase();

          const dueDate = String(row["Due Date"] ?? "").trim();
          const category = String(row.Category ?? "None").trim();

          if (!description) return null;

          return {
            id: crypto.randomUUID(),
            description,
            completed: status === "completed",
            dueDate,
            category: category || "None",
          };
        })
        .filter(Boolean);

      if (importedTasks.length === 0) {
        alert("No valid tasks found in the CSV file.");
        return;
      }

      onImportTasks(importedTasks);

      alert(`${importedTasks.length} tasks imported successfully!`);
    } catch (error) {
      console.error("CSV import failed:", error);
      alert("Failed to import CSV. Please check the file format.");
    } finally {
      event.target.value = "";
    }
  }

  function downloadCSVTemplate() {
    const templateData = [
      {
        Task: "Learn Python",
        Status: "Incomplete",
        "Due Date": "2026-11-25",
        Category: "Personal",
      },
      {
        Task: "Finish Assignment",
        Status: "Incomplete",
        "Due Date": "2026-11-24",
        Category: "Urgent",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);

    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "todo-import-template.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <div className="export-container">
      <button
        type="button"
        className="btn template-btn"
        onClick={downloadCSVTemplate}
      >
        <i className="bi bi-download" aria-hidden="true"></i>
        Download Template
      </button>

      <label htmlFor="csvImport" className="btn export-btn">
        <i className="bi bi-upload" aria-hidden="true"></i>
        Import CSV
      </label>

      <input
        id="csvImport"
        type="file"
        accept=".csv,text/csv"
        onChange={importCSV}
        className="visually-hidden"
      />

      <button
        type="button"
        className="btn export-btn"
        onClick={exportTasks}
        disabled={filteredTasks.length === 0}
      >
        <i className="bi bi-download" aria-hidden="true"></i>
        Export Filtered Tasks
      </button>
    </div>
  );
}
