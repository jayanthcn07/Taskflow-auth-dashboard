import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const loadTasks = async () => {
    const res = await axios.get("https://taskflow-auth-dashboard.onrender.com/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        search: search || undefined,
        status: filter !== "all" ? filter : undefined,
      },
    });
    setTasks(res.data);
  };

  const loadProfile = async () => {
    const res = await axios.get("https://taskflow-auth-dashboard.onrender.com/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  useEffect(() => {
    loadProfile();
    loadTasks();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [search, filter]);

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(
      "https://taskflow-auth-dashboard.onrender.com/api/tasks",
      { title: title.trim() },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    loadTasks();
    showToast("Task Added");
  };

  const toggleStatus = async (task) => {
    await axios.put(
      `https://taskflow-auth-dashboard.onrender.com/api/tasks/${task._id}`,
      {
        status: task.status === "pending" ? "completed" : "pending",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadTasks();
    showToast("Task Updated");
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://taskflow-auth-dashboard.onrender.com/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTasks();
    showToast("Task Deleted");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={darkMode ? "" : "light"} style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Dashboard</h2>

        {user && (
          <div style={{ marginBottom: "20px" }}>
            <h3>{user.name}</h3>
            <p style={{ fontSize: "14px", opacity: 0.7 }}>{user.email}</p>
          </div>
        )}

        <button onClick={() => setDarkMode(!darkMode)} style={styles.themeBtn}>
          Toggle Theme
        </button>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      <div style={styles.main}>
        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <div className="card">Total: {tasks.length}</div>
          <div className="card">
            Completed: {tasks.filter(t => t.status === "completed").length}
          </div>
          <div className="card">
            Pending: {tasks.filter(t => t.status === "pending").length}
          </div>
        </div>

        <div style={styles.topBar}>
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div style={styles.addBox}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        {tasks.map((task) => (
          <div
            key={task._id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <span
              style={{
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>

            <div>
              <button onClick={() => toggleStatus(task)}>
                {task.status === "pending" ? "Complete" : "Undo"}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                style={{ backgroundColor: "#e74c3c", marginLeft: "8px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "240px",
    padding: "20px",
    background: "#111827",
  },
  themeBtn: {
    marginTop: "10px",
    padding: "8px",
    width: "100%",
    background: "#2563eb",
    color: "white",
  },
  logout: {
    marginTop: "10px",
    padding: "8px",
    width: "100%",
    background: "#e74c3c",
    color: "white",
  },
  main: {
    flex: 1,
    padding: "30px",
  },
  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  addBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  addBtn: {
    padding: "10px 15px",
    background: "#10b981",
    color: "white",
  },
  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#10b981",
    padding: "12px 20px",
    borderRadius: "8px",
  },
};
