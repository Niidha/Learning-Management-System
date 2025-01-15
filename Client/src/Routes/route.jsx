import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { ProtectedRoute } from "./protected";
import Layout from "../Layout";
import StudentDetails from "../Pages/ViewProfile";
import CourseList from "../Pages/CourseList";
import CourseDetail from "../Pages/CourseDetail";

import ViewProfile from "../Pages/ViewProfile";
import UpdateProfile from "../Pages/UpdateProfile";



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route
            path="studentdetail"
            element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            }
          />
        </Route>
          <Route path="courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
          <Route path="courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
          <Route path="/view-profile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
          <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
       
     
     
     
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
