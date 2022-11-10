import React, { useState, useCallback } from "react";
import { Grid, Paper } from "@material-ui/core/";
import CancelIcon from "@material-ui/icons/Cancel";
import ToDoForm from "./ToDoForm";
import { IToDo } from "./types";

type ToDoItemProps = {
  toDoItem: IToDo;
  updateToDo: (updatedToDo: IToDo) => void;
  removeTodo: (id: number) => void;
};

const ToDoItem: React.FC<ToDoItemProps> = ({
  toDoItem,
  updateToDo,
  removeTodo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const save = useCallback(
    (newToDoName) => {
      updateToDo({ ...toDoItem, name: newToDoName });
      setIsEditing(false);
    },
    [updateToDo, toDoItem]
  );
  return (
    <Grid item xs={12} sm={6} className="grid-item">
      <Paper
        onClick={() => {
          if (!isEditing) {
            updateToDo({ ...toDoItem, completed: !toDoItem.completed });
          }
        }}
        className={`todo-item ${!toDoItem.completed ? "" : "completed"}`}
      >
        {isEditing ? (
          <>
            <ToDoForm save={save} cancel={() => setIsEditing(false)} />
          </>
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            {toDoItem.name}
          </span>
        )}
        {!isEditing && (
          <CancelIcon
            onClick={(e) => {
              e.stopPropagation();
              removeTodo(toDoItem.id);
            }}
            fontSize="small"
            className="actions delete-item"
          />
        )}
      </Paper>
    </Grid>
  );
};

export default ToDoItem;
