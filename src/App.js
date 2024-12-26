import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/register";
import Profile from "./components/Profile";
import Notifications from "./components/Notification";
import Settings from "./components/Settings";
import Confirm from "./components/Confirm";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/confirm" element={<Confirm />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
