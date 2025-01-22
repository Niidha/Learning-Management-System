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
import AddCourse from "../provider/addCourse";
import FavoritesPage from "../Pages/favourites";
import VideoList from "../Pages/videofetching";




const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={ <Login /> }/>
          <Route path="signup" element={<ProtectedRoute auth={true} ><Signup /></ProtectedRoute>} />
      
         

        </Route>
        <Route path="addcourse" element={<AddCourse />} />
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
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage/></ProtectedRoute>} />
          <Route path="/videos/:courseId/:topic" element={<ProtectedRoute><VideoList /></ProtectedRoute>} />
          
       
     
     
     
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
