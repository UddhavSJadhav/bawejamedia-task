/* eslint-disable react/prop-types */
import { useState } from "react";

import LoadingSVG from "./LoadingSVG";
import DeleteSVG from "./DeleteSVG";

const ToDo = ({ toDo, updateToDo, deleteToDo }) => {
  // state to check if any changes are made to the todo item.
  const [isActionLoading, setIsActionLoading] = useState(false);

  // function to update loading state and call required function.
  async function callAction(type, payload) {
    if (isActionLoading) return;
    if (type === "update") {
      setIsActionLoading("update");
      await updateToDo(payload);
    } else {
      setIsActionLoading("delete");
      await deleteToDo(payload);
    }
    setIsActionLoading(false);
  }

  return (
    <div className="todo-body">
      <div>
        {isActionLoading === "update" ? (
          <LoadingSVG className="loading-svg" />
        ) : (
          <input
            type="checkbox"
            name={"checkbox" + toDo.id}
            className="w-3 h-3 accent-gray-400 scale-150"
            checked={toDo.completed}
            onChange={(e) => callAction("update", e)}
            disabled={isActionLoading}
          />
        )}
      </div>

      <div className={`todo-text ${toDo.completed ? "line-through" : ""}`}>
        {toDo.title}
      </div>

      <div>
        {isActionLoading === "delete" ? (
          <LoadingSVG className="loading-svg" />
        ) : (
          <DeleteSVG
            className="delete-svg"
            onClick={() => callAction("delete", toDo.id)}
          />
        )}
      </div>
    </div>
  );
};

export default ToDo;
