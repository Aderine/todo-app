export default function openDatePicker(event) {
  const input = event.currentTarget;
  if (typeof input.showPicker === "function") {
    input.showPicker();
    event.preventDefault();
  }
}
