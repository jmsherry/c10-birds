import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [birds, setBirds] = useState([]);

  const getBirds = async () => {
    try {
      const response = await fetch("/api/v1/birds");
      console.log("🚀 ~ file: App.jsx ~ line 10 ~ getBirds ~ response", response)
      
      if (!response.ok) throw response;
      const data = await response.json();
      console.log("🚀 ~ file: App.jsx ~ line 14 ~ getBirds ~ data", data)
      
      setBirds(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBirds();
  }, []);

  return (
    <div className="App">
      <h1>Birds</h1>
      <ul>
        {birds.map(({name, _id}) => (<li key={_id}>{name}</li>))}
      </ul>
    </div>
  );
}

export default App;
