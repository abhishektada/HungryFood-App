import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const validationFunction = (data) => {
    let error = {};
    if (!data.email) {
      error.email = "Email is required";
    }
    if (!data.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const submit = async()=>{
    if (Object.keys(errors).length === 0 && isSubmit) {
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
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem("key",json.authToken)
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
      setIsSubmit(false)
    }else{
      setIsSubmit(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validationFunction(credentials));
    if(Object.keys(errors).length === 0){
      setIsSubmit(true)
    }else{
      setIsSubmit(false)
    }
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setCredentials({ ...credentials, [name]: value });
  };

   useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      submit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit])

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
