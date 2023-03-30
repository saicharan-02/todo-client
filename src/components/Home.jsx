import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/userData/userContext";
import Task from "./Task";

function Home() {
  // Variables Area Starts
  let count = 0;
  const [taskData, setTaskData] = useState("");
  const { tasks, setTasks } = useContext(userContext);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: taskData }),
  };
  const current = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[current.getDay()];
  let longMonth = current.toLocaleString("en-us", { month: "long" });
  let date = `${longMonth} ${current.getDate()}`;
  // Variables Area Ends

  // Functions Area Starts
  function fetchTasks() {
    fetch(`https://todo-server-cedd.onrender.com/getAll`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        setTasks(result);
      });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch("https://todo-server-cedd.onrender.com/create", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        fetchTasks()
      });

    setTaskData("");
  };
  // Function Area Ends

  // Use Effect Area Starts
  useEffect(() => {
    fetchTasks();
    //eslint-disable-next-line
  }, []);
  // Use Effect Area Ends

  // Component-UI Area
  return (
    // Mid container
    <div className="flex flex-col justify-center items-center min-h-screen max-w-screen">
      <div>
        <h1 className="flex font-bold tracking-widest text-4xl justify-center">TODO LIST</h1>
        <h4 className="uppercase m-1">TODAY IS {day}, {date}</h4>
      </div>

      {/* Form Element */}
      <div className="flex flex-row justify-center items-center  mb-7 mt-4">
        <form
          onSubmit={(e) => {
            handleOnSubmit(e);
          }}
        >
          <input
            type="text"
            name="task"
            placeholder="Add Task"
            value={taskData}
            onChange={(e) => setTaskData(e.target.value)}
            className="w-80 rounded-md p-2 border-2 border-slate-400 placeholder:text-sm hover:border-purple-500 focus:outline-none focus:border-purple-500 focus:bg-purple-200 transition-colors duration-300 ease-in"
          />
          <input
            type="submit"
            value="Add"
            className="w-20 h-9 rounded-md text-white bg-purple-700  
            mx-2 p-1 cursor-pointer hover:bg-purple-600 hover:scale-105 transition-all duration-300 ease-in"
          />
        </form>
      </div>

      {/* Task Elements */}
      <div>
        {tasks.map((task) => (
          <Task key={task.id} indTask={task} index={++count} />
        ))}
      </div>
    </div>
  );
}

export default Home;
