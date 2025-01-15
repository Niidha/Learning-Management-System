import React from "react";
import { useSelector } from "react-redux";
import "../css/details.css"

const ViewProfile = () => {
  const { name, username, email, age, qualification, preferredLanguage, loading, error } = useSelector(
    (state) => state.user
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-5">Student Details</h2>

      <div className="card mb-5">
        <div className="card-body">
          <h5 className="card-title">Your Details</h5>
          <ul>
            <li><strong>Name :<em style={{ color: 'red' }}> {name}</em></strong></li>
            <li><strong>Username :<em style={{ color: 'red' }}> {username}</em></strong></li>
            <li><strong>Email :<em style={{ color: 'red' }}>  {email}</em></strong></li>
            <li><strong>Age :<em style={{ color: 'red'}}> {age}</em></strong></li>
            <li><strong>Qualification :<em style={{ color: 'red' }}>  {qualification}</em></strong></li>
            <li><strong>Preferred Language :<em style={{ color: 'red' }}> {preferredLanguage}</em></strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
