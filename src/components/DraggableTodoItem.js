"use client";

import { useDrag, useDrop } from "react-dnd";
import TodoItem from "@/components/TodoItem";

const ITEM_TYPE = "TODO_TASK";

export default function DraggableTodoItem({
  task,
  onMoveTask,
  canDrag,
  onToggle,
  onEdit,
  onDelete,
  showDragHandle = true,
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ITEM_TYPE,
      item: { id: task.id },
      canDrag: canDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task.id, canDrag],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ITEM_TYPE,
      canDrop: () => canDrag,
      drop: (draggedItem) => {
        if (draggedItem.id !== task.id) {
          onMoveTask(draggedItem.id, task.id);
        }
      },
    }),
    [task.id, canDrag, onMoveTask],
  );

  return (
    <TodoItem
      task={task}
      onToggle={onToggle}
      onEdit={onEdit}
      onDelete={onDelete}
      dragRef={drop}
      dragHandleRef={drag}
      isDragging={isDragging}
      canDrag={canDrag}
      showDragHandle={showDragHandle}
    />
  );
}
