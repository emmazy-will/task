import { useState } from "react";
import { House, Clipboard, Bell, Settings, Headset, Search, List, ClipboardCheck, ChevronDown } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Check, X } from "lucide-react";
import great from "./assets/image/images.jpg";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "✨ New task assigned to you!", read: false },
    { id: 2, text: "⏳ Project deadline approaching!", read: false },
    { id: 3, text: "💬 New message from team", read: true },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  
  const navigate = useNavigate();

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };
  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center d-block d-lg-none mt-3"
      >
        <Bell className="w-8 h-8 text-white " />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg">
            {unreadCount}
          </span>
        )}
      </button>

      <span onClick={() => setSidebarOpen(!sidebarOpen)} className="list-icon d-block d-lg-none ">
          <List size={24} />
      </span>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
  
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
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
            <li onClick={() => handleNavigation("/")}> <House size={17} /> Home </li>
            <li onClick={() => handleNavigation("/report")}> <Clipboard size={16} /> Report </li>
            <li onClick={() => handleNavigation("/task")}> <ClipboardCheck size={17} /> Task Done <ChevronDown size={18} style={{ marginLeft: '10px' }} /></li>
            <li onClick={() => handleNavigation("/notification")}> <Bell size={17} /> Notification </li>
            <li onClick={() => handleNavigation("/settings")}> <Settings size={17} /> Settings </li>
            <li onClick={() => handleNavigation("/support")}> <Headset size={17} /> Support </li>
          </ul>
          <div>
            <img className="image" src={great} alt="User" />
          </div>
        </aside>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center rounded-t-2xl">
            <h4 className="text-lg font-semibold">🔔 Notifications</h4>
            <button
              onClick={() => setNotifications([])}
              className="text-sm bg-white text-indigo-700 px-3 py-1 rounded-full hover:bg-gray-100 transition-all"
            >
              Clear All
            </button>
          </div>
          <ul className="max-h-80 overflow-auto divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <li className="p-5 text-gray-500 text-center text-lg">🎉 No new notifications!</li>
            ) : (
              notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`flex items-center justify-between p-4 transition-all ${
                    notif.read ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                  } rounded-lg shadow-sm mx-3 my-2`}
                >
                  <span className={notif.read ? "text-gray-500" : "font-semibold text-gray-800"}>
                    {notif.text}
                  </span>
                  <div className="flex gap-3">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="p-1 text-green-500 hover:text-green-700 transition-all"
                      >
                        <Check size={22} />
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(notif.id)}
                      className="p-1 text-red-500 hover:text-red-700 transition-all"
                    >
                      <X size={22} />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
