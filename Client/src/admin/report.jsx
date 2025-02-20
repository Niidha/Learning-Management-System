import React, { useState, useEffect } from 'react';
import { api } from '../axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import "../css/report.css"
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ReportPage = () => {
  const [courses, setCourses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/mycourses');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const downloadCoursePDF = (course) => {
    const doc = new jsPDF();
    const syllabusText = course.syllabus && course.syllabus.length > 0
      ? course.syllabus.map((item) => `• ${item.topic || 'No topic available'}`).join('\n')
      : 'No syllabus available';

    const headers = ['Course Name', 'Provider', 'Rating', 'Syllabus'];
    const data = [[course.title, course.provider, course.rating || 'N/A', syllabusText]];

    doc.text('Course Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Details for ${course.title}`, 20, 30);

    doc.autoTable({
      startY: 40,
      head: [headers],
      body: data,
      theme: 'grid',
      columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 50 }, 2: { cellWidth: 30 }, 3: { cellWidth: 70 } },
    });

    doc.save(`${course.title.replace(/\s+/g, '_')}_details.pdf`);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      {/* Responsive Navbar */}
      <nav className="navbar">
      <button className="profile-icon" onClick={() => setDrawerOpen(!drawerOpen)}>
          <FaUser />
        </button>
        <div className="logo">Admin Dashboard</div>
        {/* <button className="profile-icon" onClick={() => setDrawerOpen(!drawerOpen)}>
          <FaUser />
        </button> */}
      </nav>

      {/* Sidebar for Menu (Collapsible on Small Screens) */}
      {menuOpen && (
        <div className="sidebar">
          <ul>
            <li><Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/managecourse" onClick={() => setMenuOpen(false)}>Course Management</Link></li>
            <li><Link to="/manageuser" onClick={() => setMenuOpen(false)}>User Management</Link></li>
            <li><Link to="/report" onClick={() => setMenuOpen(false)}>View Report</Link></li>
            <li><Link to="/announcement" onClick={() => setMenuOpen(false)}>Announcement</Link></li>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </ul>
        </div>
      )}

      {/* User Sidebar */}
      {drawerOpen && (
        <div className="user-sidebar">
          <button className="close-btn" onClick={() => setDrawerOpen(false)}>&times;</button>
          <nav>
            <ul>
              <li><Link to="/admin-dashboard" onClick={() => setDrawerOpen(false)}>Home</Link></li>
              <li><Link to="/managecourse" onClick={() => setDrawerOpen(false)}>Course Management</Link></li>
              <li><Link to="/manageuser" onClick={() => setDrawerOpen(false)}>User Management</Link></li>
              <li><Link to="/report" onClick={() => setDrawerOpen(false)}>View Report</Link></li>
              <li><Link to="/announcement" onClick={() => setDrawerOpen(false)}>Announcement</Link></li>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </ul>
          </nav>
        </div>
      )}

      {/* Page Content */}
      <div className="content">
        <h2 className="page-title">Course Report</h2>

        {/* Table Container */}
        <div className="table-box">
          <table className="course-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Provider</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.provider}</td>
                  <td>{course.rating || 'N/A'}</td>
                  <td>
                    <button className="download-btn" onClick={() => downloadCoursePDF(course)}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #343a40;
          color: white;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 999;
        }
        .menu-toggle, .profile-icon {
          background: transparent;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
        .sidebar {
          position: fixed;
          top: 50px;
          left: 0;
          width: 250px;
          height: 100%;
          background: #343a40;
          color: white;
          padding: 20px;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
        }
        .sidebar ul li {
          margin: 15px 0;
        }
        .sidebar a, .user-sidebar a {
          color: white;
          text-decoration: none;
        }
        .logout-btn {
          background: #dc3545;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
        }
        .user-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background: #343a40;
          color: white;
          padding: 20px;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
        }
        .close-btn {
          background: transparent;
          border: none;
          font-size: 20px;
          color: white;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .page-title {
          text-align: center;
          padding-top: 60px;
        }
        .download-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
          .sidebar {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportPage;
