import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core/";

type AddToDoProps = {
  save: (name: string) => void;
  cancel: () => void;
};

const ToDoForm: React.FC<AddToDoProps> = ({ save, cancel }) => {
  const [newToDoName, setNewToDoName] = useState("");
  return (
    <>
      <TextField
        value={newToDoName}
        onChange={(e) => setNewToDoName(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        autoFocus
      />
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="actions"
      >
        <Button onClick={cancel} size="small" className="cancel">
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            save(newToDoName);
            setNewToDoName("");
          }}
          color="primary"
          disabled={!newToDoName}
          size="small"
          className="save"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ToDoForm;
