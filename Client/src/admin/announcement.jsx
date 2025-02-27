import { useEffect, useState } from "react";
import { api } from "../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Table, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false); 

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    recipients: "",
  });
  const [showList, setShowList] = useState(false);

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
      toast.error("Please provide valid recipients (comma-separated).")
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
  // Styles for navbar and button
  const navBarStyle = {
    backgroundColor: '#343a40',
    padding: '10px 20px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
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

  // Active page styles
  const activeLinkStyle = {
    color: '#007bff', // Highlight text color for active page
    fontWeight: 'bold', // Make it bold for emphasis
  };
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <Container className="p-5">
      {/* Navbar */}
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

      {/* Drawer */}
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
      <h2 className="text-center mb-4 d-none d-sm-block">Announcement Management</h2>

      <div className="bg-light p-4 rounded shadow mb-4">
        <h3 className="mb-3">Create Announcement</h3>
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Message"
              value={newAnnouncement.message}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Recipients (comma-separated)"
              value={newAnnouncement.recipients}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, recipients: e.target.value })}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Create Announcement</Button>
        </Form>
      </div>

      <div className="text-center mb-4">
        <Button variant="success" onClick={() => setShowList(!showList)}>
          {showList ? "Hide List" : "View List of Announcements"}
        </Button>
      </div>

      {showList && (
        <div className="table-responsive px-2 px-sm-4" style={{ overflowX: "auto", paddingLeft: "1.5rem" }}>
          <Table striped bordered hover className="text-center">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="d-none d-sm-table-cell">Title</th>
                <th>Message</th>
                <th>Recipients</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((ann) => (
                <tr key={ann._id}>
                  <td className="d-none d-sm-table-cell">{ann.title}</td>
                  <td>{ann.message}</td>
                  <td>{Array.isArray(ann.recipients) ? ann.recipients.join(", ") : "No Recipients"}</td>

                  <td>
                    <Button variant="danger" onClick={() => handleDelete(ann._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <ToastContainer />
    </Container>
  );
};

export default AnnouncementManagement;
