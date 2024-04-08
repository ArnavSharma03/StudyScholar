// React
import { useEffect } from "react"
import "./App.css"


// Redux
import { useDispatch, useSelector } from "react-redux"

// React Router
import { Route, Routes, useNavigate } from "react-router-dom"


// Components
import Navbar from "./components/common/Navbar";


// pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Error from "./pages/Error";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";

// private routes and open Routes
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";


function App() {

    const { user } = useSelector((state) => state.profile);

    return <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
        <Navbar />
        <Routes>
            <Route path="/" element = {  <Home />  } />
            <Route path="/about" element = {  <About />   } />
            <Route path="/contact" element={  <Contact />  } />
            {/* Later Added  */}
            <Route path="/catalog/:catalogName" element={ <Catalog />} />
            <Route path="courses/:courseId" element={ <CourseDetails />} />









            {/* Open Route - for Only Non Logged in User */}
            <Route path="signup" element = {  <OpenRoute>  <Signup /> </OpenRoute> }  />
            <Route path="login" element = {  <OpenRoute> <Login />  </OpenRoute>  }  />
            <Route path="forgot-password" element = {  <OpenRoute> <ForgotPassword />  </OpenRoute> }  />
            <Route path="update-password/:id" element = {  <OpenRoute> <UpdatePassword /> </OpenRoute>  } />
            <Route path="verify-email" element = {  <OpenRoute> <VerifyEmail /> </OpenRoute>  }  />














            {/* Private Route - for Only Logged in User */} 
            
            <Route element ={ <PrivateRoute> <Dashboard /> </PrivateRoute> } >
                {/* Route for all users ===> student + instructor */}
                <Route path="dashboard/my-profile" element={ < MyProfile />} />
                <Route path="dashboard/Settings" element={ < Settings />} />



                {
                    user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route path="dashboard/enrolled-courses" element={ <EnrolledCourses /> } />
                            <Route path="dashboard/cart" element = { <Cart /> } />
                        </>
                    )
                }


                
                {
                    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                            <Route path="dashboard/add-course" element={ <AddCourse /> } />
                            <Route path="dashboard/my-courses" element={ <MyCourses /> } />
                            <Route path="dashboard/edit-course/:courseId" element={ <EditCourse />} />
                        </>
                    )
                }


            </Route>







            { /* Alone dashboard page doesn't exist as single entity ---> always used with dashboard/my-profile */}
            {/* Below route is only for testing purpose */}
            <Route path="dashboard" element= {  <PrivateRoute> <div className="text-white" > Welcome to dashboard </div>  </PrivateRoute> }  />



            {/* 404 Page */}
            <Route path="*" element={ <Error />} />
        </Routes>
    </div>
}



export default App;