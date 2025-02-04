import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { ProtectedRoute } from "./protected";
import Layout from "../Layout";


import AddCourse from "../provider/addCourse";

import VideoList from "../Pages/videofetching";

import ProviderDashboard from "../provider/providerDashboard";
import MyCourses from "../provider/myCourses";
import UpdateCourse from "../provider/updatecourse";
import AdminDashboard from "../admin/adminDashboard";
import CourseManagement from "../admin/coursemanagement";
import UserManagement from "../admin/usermanagement";
import AnnouncementManagement from "../admin/announcement";
import HomePage from "../Pages/homepage";
import ReportPage from "../admin/report";
import CourseDetail from "../student/CourseDetail";
import CourseList from "../student/CourseList";
import FavoritesPage from "../student/favourites";
import UpdateUserProfile from "../student/UpdateProfile";




const Router = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={ <Login /> }/>
          <Route path="signup" element={<ProtectedRoute auth={true} ><Signup /></ProtectedRoute>} />
        </Route>

        <Route path="create-course" element={<AddCourse />} />
        <Route path="/" element={<Layout />}></Route>
        <Route path="courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
        <Route path="courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/update-profile" element={<ProtectedRoute><UpdateUserProfile /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage/></ProtectedRoute>} />
        <Route path="/videos/:courseId/:topic" element={<ProtectedRoute><VideoList /></ProtectedRoute>} />


{/* provider */}
        <Route path="/provider-dashboard" element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} />
        <Route path="/mycourses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/edit-course/:courseId" element={<ProtectedRoute><UpdateCourse /></ProtectedRoute>} />
          
{/* admin */}
          
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/managecourse" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
        <Route path="/manageuser" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />

        <Route path="/announcement" element={<ProtectedRoute><AnnouncementManagement /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute><ReportPage/></ProtectedRoute>} />
          

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
