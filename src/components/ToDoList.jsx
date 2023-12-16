import { useState, useEffect } from "react";

import AddToDo from "./AddToDo";
import ToDo from "./ToDo";

// common api uri
const API = "https://jsonplaceholder.typicode.com/todos";

const ToDoList = () => {
  // set To Do items if available in localstorage
  const [toDoItems, setToDoItems] = useState(
    localStorage.getItem("todos")
      ? [...JSON.parse(localStorage.getItem("todos"))]
      : []
  );

  // if toDo list present then return
  // else fetch api and set toDo list
  async function getToDos() {
    try {
      if (toDoItems.length > 0) return;

      const response = await fetch(API);
      const data = await response.json();
      setToDoItems([...data]);
      updateLocalTodos();
    } catch (error) {
      console.error(error);
    }
  }

  // update todo list in localstorage
  function updateLocalTodos() {
    localStorage.setItem("todos", JSON.stringify(toDoItems));
  }

  // add new todo item
  async function addToDo(body) {
    try {
      const response = await fetch(API, {
        method: "POST",
        body: JSON.stringify({ ...body }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const newTodo = await response.json();
      setToDoItems((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error(error);
    }
  }

  // update status of todo item
  async function updateToDo(event) {
    try {
      const { name, checked } = event.target;
      const id = name.replace("checkbox", "");
      await fetch(API + "/" + id, {
        method: "PATCH",
        body: JSON.stringify({ completed: checked }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setToDoItems((prev) => {
        let clone = prev;
        const index = clone.findIndex((todo) => todo.id === Number(id));
        let obj = { ...clone[index] };
        obj.completed = checked;
        clone[index] = { ...obj };
        return [...clone];
      });
    } catch (error) {
      console.error(error);
    }
  }

  // delete todo item
  async function deleteToDo(id) {
    try {
      await fetch(API + "/" + id, {
        method: "DELETE",
      });
      setToDoItems((prev) => {
        return [...prev.filter((todo) => todo.id !== id)];
      });
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect if there are changes made in todoList array
  useEffect(() => {
    updateLocalTodos();
  }, [toDoItems]);

  // useEffect to initially fetch todo items
  useEffect(() => {
    getToDos();
  }, []);

  return (
    <section className="todo-main">
      <h2>To Do List</h2>

      <div>
        <AddToDo addToDo={addToDo} />
      </div>

      <div>
        {toDoItems.map((toDo) => (
          <ToDo key={toDo.id} {...{ toDo, updateToDo, deleteToDo }} />
        ))}
      </div>
    </section>
  );
};

export default ToDoList;
