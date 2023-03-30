import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import userContext from "../context/userData/userContext";

function Task(props) {
  const { tasks, setTasks } = useContext(userContext);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "id": props.indTask.id })
  };

  function deleteTask() {
    fetch("https://todo-server-cedd.onrender.com/deleteTodo", requestOptions)
      .then((response) => {
        response.json();
      });
    const updatedTodoItems = tasks.filter(
      (data) => data.id !== props.indTask.id
    );
    setTasks([...updatedTodoItems]);
  }

  return (
    <div
      className={`flex flex-row ${
        props.index % 2 === 0 ? "" : "bg-slate-300"
      } px-6 py-2 `}
    >
      <p className="w-[23rem] break-words">
        {`${props.index}. ${props.indTask.task}`}
      </p>

      <FaCheck
        onClick={() => {
          deleteTask();
        }}
        className="m-1 text-purple-800 cursor-pointer hover:scale-125 transition-all duration-300 ease-in"
      />
    </div>
  );
}

export default Task;
