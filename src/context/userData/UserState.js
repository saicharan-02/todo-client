import { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [tasks, setTasks] = useState([]);

  return (
    <userContext.Provider
      value={{
        error,
        setError,
        items,
        setItems,
        tasks,
        setTasks,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
