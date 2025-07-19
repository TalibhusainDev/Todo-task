/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Form from "../ui/Form";
import TaskList from "../ui/TaskList";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<any>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(stored);
  }, []);
  return (
    <>
      <Form setTasks={setTasks} />
      <TaskList setTasks={setTasks} tasks={tasks} />
    </>
  );
};

export default Home;
