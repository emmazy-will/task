import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { User, Mail, Bell, Moon, Save, ArrowLeft } from "lucide-react";

function Settings() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => window.history.back()}>
        <ArrowLeft size={18} /> Back
      </button>
      <h2 className="mb-4">Settings</h2>

      {/* Profile Settings */}
      <div className="card p-4 mb-3">
        <h4 id="pro">
          <User size={20} /> Profile
        </h4>

        {/* Profile Picture Upload */}
        <div className="mb-3 text-center">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-circle"
              width="100"
              height="100"
            />
          ) : (
            <div
              className="border rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 100, height: 100, background: "#eee" }}
            >
              <User size={40} />
            </div>
          )}
          <input
            type="file"
            className="form-control mt-2"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <label className="form-label mt-2">Username</label>
        <div className="input-group">
          <span className="input-group-text">
            <User size={16} />
          </span>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <label className="form-label mt-3">Email</label>
        <div className="input-group">
          <span className="input-group-text">
            <Mail size={16} />
          </span>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="card p-4 mb-3">
        <h4 id="pre">
          <Bell size={20} /> Preferences
        </h4>
        <div className="form-check form-switch mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <label className="form-check-label">Enable Notifications</label>
        </div>

        <div className="form-check form-switch mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label className="form-check-label">
            <Moon size={16} /> Dark Mode
          </label>
        </div>
      </div>

      <button className="btn btn-success" onClick={handleSave}>
        <Save size={16} /> Save Changes
      </button>
    </div>
  );
}

export default Settings;
