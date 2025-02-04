import { useEffect, useState } from "react";
import { api } from "../axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    recipients: "",
  });
  const [showList, setShowList] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const navBarStyle = {
    padding: '10px 20px',
    backgroundColor: '#343a40',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const activeLinkStyle = {
    color: '#007bff',
    fontWeight: 'bold',
    textDecoration: 'none',
  };
  const logoutbuttonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'absolute', // Position relative to the nearest positioned ancestor
    bottom: '10px',
    left: '10px'
  };

 
  useEffect(() => {
    api.get("/admin/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);


  const handleCreate = async (e) => {
    e.preventDefault();

    const { title, message, recipients } = newAnnouncement;

    
    if (!title || !message || !recipients) {
      toast.error("All fields are required!");
      return;
    }

    
    const recipientsArray = recipients.split(",").map((rec) => rec.trim());
    if (recipientsArray.length === 0 || recipientsArray.some((rec) => rec === "")) {
      toast.error("Please provide valid recipients (comma-separated).");
      return;
    }

    try {
      const response = await api.post("/admin/announcements", {
        title,
        message,
        recipients: recipientsArray,
      });
      setAnnouncements([...announcements, response.data]);
      setNewAnnouncement({ title: "", message: "", recipients: "" });
      toast.success("Announcement created successfully!");
    } catch (err) {
      console.error("Error creating announcement:", err);
      toast.error("Failed to create announcement!");
    }
  };


  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this announcement?");
    if (isConfirmed) {
      api.delete(`/admin/announcements/${id}`)
        .then(() => {
          setAnnouncements(announcements.filter(ann => ann._id !== id));
          toast.success("Announcement deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting announcement:", err);
          toast.error("Failed to delete announcement!");
        });
    }
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <div>
    <div style={navBarStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{ ...buttonStyle, backgroundColor: 'transparent', color: '#fff', marginRight: '20px' }}
        >
          <FaUser style={{ marginRight: '8px' }} />
        </button>
      </div>
    </div>

    {drawerOpen && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '250px',
          height: '100%',
          backgroundColor: '#343a40',
          color: '#fff',
          padding: '20px',
          zIndex: 999,
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
        }}
      >
        <button
          onClick={() => setDrawerOpen(false)}
          style={{
            backgroundColor: 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          &times;
        </button>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/admin-dashboard"
                style={location.pathname === "/admin-dashboard" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
              >
               Home
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/managecourse"
                style={location.pathname === "/managecourse" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
              >
                Course Management
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/manageuser"
                style={location.pathname === "/manageuser" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
              >
                User Management
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/report"
                style={location.pathname === "/report" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
              >
                View Report
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link
                to="/announcement"
                style={location.pathname === "/announcement" ? activeLinkStyle : { color: '#fff', textDecoration: 'none' }}
              >
                Announcement
              </Link>
            </li>
            <button style={logoutbuttonStyle} onClick={logout}>
          Logout
        </button>
          </ul>
        </nav>
      </div>
    )}
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Announcement Management</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Create Announcement</h3>
        <form onSubmit={handleCreate}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              className="input-field w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Message</label>
            <textarea
              value={newAnnouncement.message}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
              className="input-field w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Recipients (comma separated)</label>
            <input
              type="text"
              value={newAnnouncement.recipients}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, recipients: e.target.value })}
              className="input-field w-full"
              required
            />
          </div>
          
          <button type="submit" className="w-50 px-4 py-2 bg-blue-500 text-white rounded">
            Create Announcement
          </button>
        </form>
      </div>

   
      <div className="text-right mb-4 ">
        <button
          onClick={() => setShowList(!showList)}
          className="px-4 py-3 my-3 bg-success-500 text-white rounded"
          style={{backgroundColor:"#21D375"}}
        >
          {showList ? "Hide List" : "View List of Announcements"}
        </button>
      </div>

      {/* Display Announcements */}
      {showList && (
        <div className="mt-6">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Recipients</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((ann) => (
                <tr key={ann._id} className="text-center border">
                  <td className="p-2 border">{ann.title}</td>
                  <td className="p-2 border">{ann.message}</td>
                  <td className="p-2 border">{ann.recipients.join(", ")}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(ann._id)}
                      className="px-3 py-1 bg-red-500 text-black rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
      </div>
      </div>
 
  
    
  );
};

export default AnnouncementManagement;
