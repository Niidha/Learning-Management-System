import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const { isAuthenticated, role } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CourseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute allowedRoles={["student","provider"]}>
              <CourseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <UpdateUserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/:courseId/:topic"
          element={
            <ProtectedRoute allowedRoles={["student","provider"]}>
              <VideoList />
            </ProtectedRoute>
          }
        />

        {/* Provider Routes */}
        <Route
          path="/provider-dashboard"
          element={
            <ProtectedRoute allowedRoles={["provider"]}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycourses"
          element={
            <ProtectedRoute allowedRoles={["provider"]}>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-course"
          element={
            <ProtectedRoute allowedRoles={["provider"]}>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-course/:courseId"
          element={
            <ProtectedRoute allowedRoles={["provider"]}>
              <UpdateCourse />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/managecourse"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manageuser"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/announcement"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AnnouncementManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ReportPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
