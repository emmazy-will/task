import { useState } from "react";
import { List, MessageCircle, Settings, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import great from "./assets/image/images.jpg";
import { House, Clipboard, Bell, Headset, Search, ClipboardCheck, ChevronDown } from "lucide-react";

const supportTickets = [
  { id: 1, subject: "Cannot log in", date: "2025-02-20", status: "Open" },
  { id: 2, subject: "Payment issue", date: "2025-02-18", status: "Resolved" },
  { id: 3, subject: "Feature request", date: "2025-02-22", status: "In Progress" },
];

const SupportDashboard = () => {
  const [tickets, setTickets] = useState(supportTickets);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen overflow-x-hidden">
      {/* Sidebar Toggle Button */}
      <span onClick={() => setSidebarOpen(!sidebarOpen)} className="list-icon d-block d-lg-none">
        <List size={24} />
      </span>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar w-64 max-w-full ${sidebarOpen ? "open" : ""}`}>
        <h2 className="text-gray-800">Dashboard</h2>
        <div className="search-container">
          <input
            id="input"
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-gray-800 bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
          />
          <Search size={14} className="icon text-gray-600" />
        </div>
        <ul className="text-gray-800">
          <li onClick={() => handleNavigation("/")}> <House size={17} /> Home </li>
          <li onClick={() => handleNavigation("/report")}> <Clipboard size={16} /> Report </li>
          <li onClick={() => handleNavigation("/task")}> <ClipboardCheck size={17} /> Task Done <ChevronDown size={18} style={{ marginLeft: "10px" }} /></li>
          <li onClick={() => handleNavigation("/notification")}> <Bell size={17} /> Notification </li>
          <li onClick={() => handleNavigation("/settings")}> <Settings size={17} /> Settings </li>
          <li onClick={() => handleNavigation("/support")}> <Headset size={17} /> Support </li>
        </ul>
        <div>
          <img className="image rounded-full border border-gray-300" src={great} alt="User" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content container mx-auto max-w-7xl p-8"style={{}}>
        <div className="bg-white shadow-2xl rounded-lg p-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">🆘 Support Tickets</h2>
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
              <PlusCircle className="w-5 h-5 mr-2" /> New Ticket
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="p-4 text-left">Subject</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="text-gray-800 text-lg border-b border-gray-300 hover:bg-gray-100">
                    <td className="p-4">{ticket.subject}</td>
                    <td className="p-4 text-center">{ticket.date}</td>
                    <td className="p-4 text-center font-semibold">
                      <span className={`px-3 py-1 rounded-full text-white ${
                        ticket.status === "Open" ? "bg-red-500" :
                        ticket.status === "Resolved" ? "bg-green-500" : "bg-yellow-500"
                      }`}>
                        {ticket.status}
                      </span>
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

export default SupportDashboard;
