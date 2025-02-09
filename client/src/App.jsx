import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Main from './pages/main';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
import CreatePost from './pages/CreatePost';
import Chatbot from './components/Chatbot';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />

        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      <Chatbot/>
      <Footer />
    </BrowserRouter>
  );
}
