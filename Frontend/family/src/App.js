import "./App.css";
import RegisterForm from "./components/registerpage/register";
import LoginForm from "./components/loginpage/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";

function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>{" "}
    </div>
  );
}

export default App;
