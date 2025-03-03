import { useState } from "react";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import great from "./assets/image/images.jpg";
import { House, Clipboard, Bell, Headset, Search, ClipboardCheck, ChevronDown } from "lucide-react";

const tasksData = [
  { id: 1, title: "Design Homepage", dueDate: "2025-02-28", status: "Completed" },
  { id: 2, title: "Fix Login Bug", dueDate: "2025-03-05", status: "In Progress" },
  { id: 3, title: "Update API Endpoints", dueDate: "2025-03-10", status: "Pending" },
];

const TaskManagementDashboard = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard">
      {/* Sidebar Toggle Button */}
      <span onClick={() => setSidebarOpen(!sidebarOpen)} className="list-icon d-block d-lg-none">
        <List size={24} />
      </span>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Dashboard</h2>
        <div className="search-container">
          <input
            id="input"
            type="text"
            placeholder="Search tasks..."
          />
          <Search size={14} className="icon" />
        </div>
        <ul>
          <li onClick={() => handleNavigation("/")}> <House size={17} /> Home </li>
          <li onClick={() => handleNavigation("/report")}> <Clipboard size={16} /> Report </li>
          <li onClick={() => handleNavigation("/task")}> <ClipboardCheck size={17} /> Task Done <ChevronDown size={18} style={{ marginLeft: "10px" }} /></li>
          <li onClick={() => handleNavigation("/notification")}> <Bell size={17} /> Notification </li>
          <li onClick={() => handleNavigation("/settings")}> <Clipboard size={17} /> Settings </li>
          <li onClick={() => handleNavigation("/support")}> <Headset size={17} /> Support </li>
        </ul>
        <div>
          <img className="image" src={great} alt="User" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="container mx-auto p-8">
          <div className="bg-white shadow-2xl rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">✅ Task Management Dashboard</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-300 p-2">Task</th>
                  <th className="border border-gray-300 p-2">Due Date</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="text-center hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{task.title}</td>
                    <td className="border border-gray-300 p-2">{task.dueDate}</td>
                    <td className="border border-gray-300 p-2 font-semibold text-blue-600">
                      {task.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskManagementDashboard;
