// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [endPoint, setEndPoint] = useState("");
  const [container, setContainer] = useState([]);
  const [showElements, setShowElements] = useState(false);

  const fetchMe = () => {
    fetch(
      `https://online-movie-database.p.rapidapi.com/auto-complete?q=${endPoint}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7a9c9aa26fmsh5ffc8e3b2531615p14e405jsn1108d94a92e3",
          "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setContainer(data.d);
        setShowElements(true); // Show elements after fetching data
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetchMe();
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input type="text" value={endPoint} onChange={onChangeHandler} />
        <button type="submit">Submit</button>
      </form>

      {showElements && (
        <div className="element">
          {container.map((item, index) => (
            <div key={index} className="element-div">
              <img src={item.i.imageUrl} alt="" />
              <p>{item.l}</p>
              <p>Cast:{item.s}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
