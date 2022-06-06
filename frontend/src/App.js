import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/values", {
      method: "post",
      body: JSON.stringify({
        value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setList((prev) => [value, ...prev]);
        setValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("/api/values")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setList(data.map((d) => d.value));
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        제발되면 좋겠다요...
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="텍스트 입력하세요" onChange={handleChange} value={value} />
          <button>저장</button>
        </form>
      </header>
    </div>
  );
}

export default App;
