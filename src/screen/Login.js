import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(true);
  const [errors, setErrors] = useState({});

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const validationFunction = (data) => {
    let error = {};
    if (!data.email) {
      error.email = "Email is required";
      setIsSubmit(false);
    } else if (data.email && data.password) {
      setIsSubmit(true);
    }
    if (!data.password) {
      error.password = "Password is required";
      setIsSubmit(false);
    } else if (data.password && data.email) {
      setIsSubmit(true);
    }
    return error;
  };

  const submit = async () => {
    let url = "/auth/login";
    const response = await fetch(`http://localhost:5000${url}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("key", json.authToken);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmit) {
      return submit();
    } else {
      console.log("isSubmit else ", isSubmit);
      return setIsSubmit(false);
    }
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    setErrors(validationFunction(credentials));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  return (
    <div>
      <Navbar />
      <div className="container text-white fs-5" style={{ marginTop: "100px" }}>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleOnChange}
              aria-describedby="emailHelp"
            />
            <div className="text-danger">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleOnChange}
            />
            <div className="text-danger">{errors.password}</div>
          </div>
          <div className="my-4">
            <button
              type="submit"
              className="btn btn-success fw-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <Link className="btn btn-danger mx-3 fw-bold" to="/register">
              Create Account
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
