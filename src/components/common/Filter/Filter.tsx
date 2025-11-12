import styles from "./Filter.module.css";

interface FilterProps {
  search: string;
  setSearch: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  status: "all" | "completed" | "incomplete";
  setStatus: (value: "all" | "completed" | "incomplete") => void;
}

function Filter({
  search,
  setSearch,
  date,
  setDate,
  status,
  setStatus,
}: FilterProps) {
  return (
    <div className={styles.filter}>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
        aria-label="Search tasks by title"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.input}
        aria-label="Filter tasks by date"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
        className={styles.select}
        aria-label="Filter tasks by status"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
}

export default Filter;
