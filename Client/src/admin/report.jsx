import React, { useState, useEffect } from 'react';
import { api } from '../axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import "../css/report.css"
import { FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ReportPage = () => {
  const [courses, setCourses] = useState([]);
 const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  const activeLinkStyle = {
    color: '#007bff',
    fontWeight: 'bold',
    textDecoration: 'none',
  };
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

    // Format syllabus as bullet points
    const syllabusText = course.syllabus && course.syllabus.length > 0
      ? course.syllabus.map((item) => `• ${item.topic || 'No topic available'}`).join('\n')  // Assuming each item has a 'topic' field
      : 'No syllabus available';

    // Define table headers and content
    const headers = ['Course Name', 'Provider', 'Rating', 'Syllabus'];
    const data = [
      [
        course.title,
        course.provider,
        course.rating || 'N/A',
        syllabusText,  // Using formatted syllabus text
      ],
    ];

    // Title for the PDF
    doc.text('Course Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Details for ${course.title}`, 20, 30);

    // Generate table in PDF using autoTable
    doc.autoTable({
      startY: 40,
      head: [headers],
      body: data,
      theme: 'grid',
      columnStyles: {
        0: { cellWidth: 50 }, // Course Name
        1: { cellWidth: 50 }, // Provider
        2: { cellWidth: 30 }, // Rating
        3: { cellWidth: 70 }, // Syllabus (as bullet points)
      },
    });

    // Save the PDF
    doc.save(`${course.title.replace(/\s+/g, '_')}_details.pdf`);
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
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', display:"flex", justifyContent:"center",  paddingTop:"30px"}}>Course Report</h2>

      {/* Box for Table */}
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
                  <button 
                    onClick={() => downloadCoursePDF(course)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ReportPage;
