import { useState, useEffect } from "react";

type TodoData = {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
};

function App() {
  const [count, setCount] = useState(1);
  const [todoData, setTodoData] = useState<TodoData | null>(null);
  useEffect(() => {
    fetch("http://www.boredapi.com/api/activity/")
      .then((response) => response.json())
      .then((json) => setTodoData(json))
      .catch((error) => {
        console.log(error);
        setTodoData(null);
      });
  }, [count]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </button>
      {todoData ? (
        <div>
          <p>Activity: {todoData.activity}</p>
          <p>type: {todoData.type}</p>
          <p>Participants: {todoData.participants}</p>
          <p>Type: {todoData.type}</p>
          <p>Address: {todoData.link ? todoData.link : "false"}</p>
        </div>
      ) : (
        <p>no todo found</p>
      )}
    </div>
  );
}

export default App;
