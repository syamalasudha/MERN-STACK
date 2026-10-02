import SignUp from "./SignUp.jsx"
import NavBar from "./NavBar.jsx"
import ProductCard from "./ProductCard.jsx"
import SignIn from "./SignIn.jsx"
import HomePage from "./HomePage.jsx"
import {Routes, Route} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoutes.jsx"
import Profile from "./Profile.jsx"
import WritePost from "./WritePost.jsx"
import MyPosts from "./MyPosts.jsx"
import PostDetails from "./PostDetails.jsx"
import {AuthProvider} from "./AuthContext.jsx"


// w-1/3
// sm	40rem (640px)	
// md	48rem (768px)	
// lg	64rem (1024px)
// xl	80rem (1280px)	
// 2xl	96rem (1536px)

const App = () => {
  return (
  
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts/new" element={<ProtectedRoute><WritePost /></ProtectedRoute>} />
        <Route path="/my-posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
        <Route path="/posts/:id" element={<PostDetails />} />
        {/* Login required to see /profile */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App;
