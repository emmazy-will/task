import React, { useState } from "react";
import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import great from "./assets/image/images.jpg";
import { House, Clipboard, Bell, Headset, Search, ClipboardCheck, ChevronDown } from "lucide-react";

const TaskDone = ({ completedTasks = [], deleteCompletedTask }) => {
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
          <div className=" shadow-2xl rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">✅ Completed Tasks</h2>

            <div className="row flex flex-wrap gap-4" style={{flexDirection:'column'}}>
              {completedTasks.length > 0 ? (
                completedTasks.map((task, index) => (
                  <div key={task.id || index} className="col-12 col-lg-3 task-card-four p-4 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">{task.name}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <button 
                      onClick={() => deleteCompletedTask(task.id || index)} 
                      className="mt-3 bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No tasks completed yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDone;
