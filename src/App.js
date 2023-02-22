import "./App.css";
import Home from "./screen/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screen/Login";
import Register from "./screen/Register";
import { CartProvider } from "./screen/contextReducer";
import MyOrder from "./screen/Myorder";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
