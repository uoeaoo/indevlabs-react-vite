import { useEffect, useState } from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  fullInfo: string;
  creationDate: string;
  deadline: string;
  completed: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem("tasks");

    if (localData) {
      setTasks(JSON.parse(localData));
      setLoading(false);
    } else {
      fetch("/tasks.json")
        .then((res) => res.json())
        .then((data) => {
          setTasks(data.tasks);
          console.log("data", data.tasks);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading tasks: ", err);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (newTask: Omit<Task, "id">) => {
    const id = Date.now();
    const createdTask = { id, ...newTask };
    setTasks((prev) => [...prev, createdTask]);
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return { tasks, loading, addTask, removeTask, toggleComplete };
}
