import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";

const hrPerWek = 24 * 7;
function App() {
  const [taskList, setTaskList] = useState([]);
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "entry",
    };

    if (ttlHr + taskObj.hr > hrPerWek) {
      return alert("Sorry Boss not enought time fit this task from last week.");
    }

    setTaskList([...taskList, obj]);
  };

  const switchTask = (id, type) => {
    setTaskList(
      taskList.map((item) => {
        if (item.id === id) {
          item.type = type;
        }

        return item;
      })
    );
  };

  const randomIdGenerator = (lenght = 6) => {
    const str =
      "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

    let id = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      id += str[randomIndex];
    }

    return id;
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure, you want to delete this?")) {
      setTaskList(taskList.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="wrapper pt-5">
      {/* <!-- title  --> */}
      <div className="container">
        <h1 className="text-center">Not To Do List</h1>

        {/* <!-- form  --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
        />

        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">{ttlHr}</span> hrs
        </div>
      </div>
    </div>
  );
}

export default App;
