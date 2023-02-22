import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Register() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (json.success===true) {
      navigate("/");
    }
    console.log(json);
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setCredentials({ ...credentials, [name]: value });
  };

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
