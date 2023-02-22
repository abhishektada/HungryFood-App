import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Register() {
  let navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(true);
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const validationFunction = (data) => {
    let error = {};
    //Email validation
    if (!data.email) {
      error.email = "Email is required";
      setIsSubmit(false);
    }

    //Name validation
    if (!data.name) {
      error.name = "Name is required";
      setIsSubmit(false);
    }

    //Location validation
    if (!data.location) {
      error.location = "Location is required";
      setIsSubmit(false);
    }

    //Password validation
    if (!data.password) {
      error.password = "Password is required";
      setIsSubmit(false);
    } else if (data.email && data.password && data.name && data.location) {
      setIsSubmit(true);
    }
    return error;
  };
  const submit = async () => {
    let url = "/auth/createuser";
    const response = await fetch(`http://localhost:5000${url}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    if (json.success === "match") {
      alert("User already exist");
    }
    if (json.success === true) {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmit) {
      return submit();
    } else {
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
      <div
        className="container  text-white fs-5"
        style={{ marginTop: "100px" }}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleOnChange}
              aria-describedby="emailHelp"
            />
            <div className="text-black">{errors.name}</div>
          </div>
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
            <div className="text-black">{errors.email}</div>
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
            <div className="text-black">{errors.password}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={credentials.location}
              onChange={handleOnChange}
            />
            <div className="text-black">{errors.location}</div>
          </div>
          <button
            type="submit"
            className="btn btn-success fw-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link className="btn btn-danger mx-3 fw-bold" to="/login">
            Alredy user
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}
