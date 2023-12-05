import { useState } from "react";

type ActivityData = {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
};

type ErrorData = {
  error: string;
};

type Response = ActivityData | ErrorData;

const App = () => {
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [response, setResponse] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const getActivityData = () => {
    setIsLoading(true);
    fetch(`http://www.boredapi.com/api/activity?participants=${numOfPeople}`)
      .then((response) => response.json())
      .then((json) => {
        setResponse(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setResponse(null);
        setIsLoading(false);
      });
  };

  const isError = response && "error" in response;

  return (
    <div>
      <label htmlFor="participants-input">Number of participants</label>
      <input
        id="participants-input"
        value={numOfPeople}
        type="number"
        onChange={(event) => setNumOfPeople(parseInt(event.target.value))}
      />
      <button onClick={() => getActivityData()}>New Activity</button>
      {isLoading && <span>Loading...</span>}
      {response &&
        (!isError ? (
          <div>
            <p>Activity: {response.activity}</p>
            <p>type: {response.type}</p>
            <p>Participants: {response.participants}</p>
            <p>Website: {response.link ? response.link : "Not Avialable"}</p>
          </div>
        ) : (
          <p>error: {response.error}</p>
        ))}
    </div>
  );
};

export default App;
