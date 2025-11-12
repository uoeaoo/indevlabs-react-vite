import { useMemo, useState } from "react";
import styles from "./Tasks.module.css";
import Task from "./Task/Task";
import { useTasks } from "../../../hooks/useTasks";
import Filter from "../../common/Filter/Filter";
import Modal from "../../common/Modal/Modal";

function Tasks() {
  const { tasks, loading, addTask, toggleComplete } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesDate = date ? task.creationDate === date : true;
      const matchesStatus =
        status === "all"
          ? true
          : status === "completed"
          ? task.completed
          : !task.completed;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [tasks, search, date, status]);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const fullInfo = formData.get("fullInfo") as string;
    const creationDate = new Date().toISOString().split("T")[0];
    const deadline = formData.get("deadline") as string;

    addTask({
      title,
      description,
      fullInfo,
      creationDate,
      deadline,
      completed: false,
    });

    setIsModalOpen(false);
    e.currentTarget.reset();
  };

  if (loading) {
    return (
      <div className={styles.loading} aria-live="polite" aria-busy="true">
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.tasks}>
      <div className={styles.tasksHeader}>
        <Filter
          search={search}
          setSearch={setSearch}
          date={date}
          setDate={setDate}
          status={status}
          setStatus={setStatus}
        />

        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
          aria-label="Add new task"
        >
          + Add Task
        </button>
      </div>

      <div className={styles.tasksGrid} aria-live="polite" aria-atomic="false">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              creationDate={task.creationDate}
              completed={task.completed}
              onToggleCompleted={() => toggleComplete(task.id)}
            />
          ))
        ) : (
          <p className={styles.noTasks} aria-live="polite">
            No tasks found.
          </p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Add new task</h2>
          <form onSubmit={handleAddTask} className={styles.form}>
            <div className={styles.formCon}>
              <label htmlFor="title">Task Title</label>
              <input
                id="title"
                name="title"
                placeholder="Title"
                required
                aria-required="true"
              />
            </div>
            <div className={styles.formCon}>
              <label htmlFor="description">Task Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                required
                aria-required="true"
              />
            </div>
            <div className={styles.formCon}>
              <label htmlFor="fullInfo">Task Full Info</label>
              <textarea
                id="fullInfo"
                name="fullInfo"
                placeholder="Full info"
                required
                aria-required="true"
              />
            </div>
            <div className={styles.formCon}>
              <label htmlFor="deadline">Task Deadline</label>
              <input
                id="deadline"
                type="date"
                name="deadline"
                required
                aria-required="true"
              />
            </div>

            <button className={styles.formButton} type="submit">
              Add
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Tasks;
