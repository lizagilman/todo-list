import React, { useState } from "react";
import { Paper } from "@material-ui/core/";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import ToDoForm from "./ToDoForm";

type AddToDoProps = {
  saveToDo: (name: string) => void;
};

const AddToDo: React.FC<AddToDoProps> = ({ saveToDo }) => {
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Paper className={`todo-item ${!isAdding ? "add-icon" : ""}`}>
      {!isAdding ? (
        <AddCircleRoundedIcon
          onClick={() => setIsAdding(true)}
          fontSize="large"
        />
      ) : (
        <ToDoForm save={saveToDo} cancel={() => setIsAdding(false)} />
      )}
    </Paper>
  );
};

export default AddToDo;
