/* eslint-disable react/prop-types */
import { useState } from "react";

import LoadingSVG from "./LoadingSVG";

const AddToDo = ({ addToDo }) => {
  // state to view input box
  const [active, setActive] = useState(false);

  // state to store new todo item's title
  const [newToDo, setNewToDo] = useState("");

  // component loading state
  const [isAdding, setIsAdding] = useState(false);

  function handleChange(e) {
    setNewToDo(e.target.value);
  }

  function handleClose() {
    setActive(false);
    setNewToDo("");
  }

  function handleOpen() {
    setActive(true);
  }

  async function addNewTodo() {
    if (isAdding || !newToDo.trim()) return;
    setIsAdding(true);
    await addToDo({ title: newToDo, completed: false, user: 1 });
    setNewToDo("");
    setIsAdding(false);
    setActive(false);
  }

  return (
    <div className="add-todo-main">
      {active ? (
        <div>
          <input
            type="text"
            name="newToDo"
            value={newToDo}
            onChange={handleChange}
            placeholder="Type your new todo..."
          />
          <button className="add" onClick={addNewTodo} disabled={isAdding}>
            {isAdding ? (
              <>
                <LoadingSVG className="button-loading-svg" />
                Adding...
              </>
            ) : (
              "Add"
            )}
          </button>
          <button className="cancel" onClick={handleClose} disabled={isAdding}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="new" onClick={handleOpen}>
          Add New ToDo
        </button>
      )}
    </div>
  );
};

export default AddToDo;
