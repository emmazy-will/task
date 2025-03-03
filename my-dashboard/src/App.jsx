import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { House, Clipboard, Bell, Settings, Headset, Search, List, ClipboardCheck, ChevronDown } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import great from "./assets/image/images.jpg";
import SettingsPage from "./settings";
import Notify from "./notification";
import ReportWebsite from "./report";
import SupportDashboard from "./support";
import TaskDone from "./task";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();

  // Load tasks from localStorage
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
    setCompletedTasks(JSON.parse(localStorage.getItem("completedTasks")) || []);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save completed tasks to localStorage
  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleAddTask = () => {
    if (!taskName.trim()) return;
    const newTask = { id: Date.now(), name: taskName, description: taskDescription };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setTaskDescription("");
    setShowModal(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleCompleteTask = (index) => {
    const completedTask = tasks[index];
    setCompletedTasks([...completedTasks, completedTask]); // Move to completed tasks
    setTasks(tasks.filter((_, i) => i !== index)); // Remove from active tasks
  };

  const deleteCompletedTask = (id) => {
    const updatedCompletedTasks = completedTasks.filter((task) => task.id !== id);
    setCompletedTasks(updatedCompletedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          <div className="dashboard">
            {/* Sidebar */}
            <span onClick={() => setSidebarOpen(!sidebarOpen)} className="list-icon d-block d-lg-none">
              <List size={24} />
            </span>

            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
              <h2>Dashboard</h2>
              <div className="search-container">
                <input
                  id="input"
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={14} className="icon" />
              </div>
              <ul>
                <li onClick={() => handleNavigation("/")}>
                  <House size={17} /> Home
                </li>
                <li onClick={() => handleNavigation("/report")}>
                  <Clipboard size={16} /> Report
                </li>
                <li onClick={() => handleNavigation("/task")}>
                  <ClipboardCheck size={17} /> Task Done <ChevronDown size={18} style={{ marginLeft: "10px" }} />
                </li>
                <li onClick={() => handleNavigation("/notification")}>
                  <Bell size={17} /> Notification
                </li>
                <li onClick={() => handleNavigation("/settings")}>
                  <Settings size={17} /> Settings
                </li>
                <li onClick={() => handleNavigation("/support")}>
                  <Headset size={17} /> Support
                </li>
              </ul>
              <div>
                <img className="image" src={great} alt="User" />
              </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
              <header>
                <div className="container border-line">
                  <div className="row header">
                    <div className="col-12 col-lg-5">
                      <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>Task Management</h1>
                    </div>
                    <div className="col-3 col-lg-7 king">
                      <button className="add-task" onClick={() => setShowModal(true)}>
                        <span className="btn-text">+</span>
                      </button>

                      {showModal && (
                        <div className="modal d-block" tabIndex="-1">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Add New Task</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                              </div>
                              <div className="modal-body">
                                <input
                                  type="text"
                                  className="form-control mb-2"
                                  placeholder="Task Name"
                                  value={taskName}
                                  onChange={(e) => setTaskName(e.target.value)}
                                />
                                <textarea
                                  className="form-control"
                                  placeholder="Task Description"
                                  rows="3"
                                  value={taskDescription}
                                  onChange={(e) => setTaskDescription(e.target.value)}
                                ></textarea>
                              </div>
                              <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                  Close
                                </button>
                                <button className="btn btn-success" onClick={handleAddTask}>
                                  Save Task
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </header>

              {/* Task Section */}
              <section className="sect">
                <div className="container">
                  <div className="row hold-card mt-4">
                    {filteredTasks.map((task, index) => (
                      <div key={task.id} className="col-12 col-lg-3 task-card-four">
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <button className="complete" onClick={() => handleCompleteTask(index)}>
                          Mark as Done
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          </div>
        }
      />

      {/* Other Routes */}
      <Route path="/task" element={<TaskDone completedTasks={completedTasks} deleteCompletedTask={deleteCompletedTask} />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/notification" element={<Notify />} />
      <Route path="/report" element={<ReportWebsite />} />
      <Route path="/support" element={<SupportDashboard />} />
    </Routes>
  );
}

export default App;
