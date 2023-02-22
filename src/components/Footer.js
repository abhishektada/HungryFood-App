import React from 'react'

const Footer = () => {
  return (
    <><footer className="d-flex justify-content-center align-items-center py-3 border-top fixed-bottom bg-dark" >
    <p className="col-md-4 mb-0 text-muted px-4">© 2023 HungryFood, Inc</p>

    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
    </a>

    <ul className="nav col-md-4 justify-content-end px-4  ">
      <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Home</a></li>
      <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Features</a></li>
      <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Pricing</a></li>
      <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">FAQs</a></li>
      <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">About</a></li>
    </ul>
  </footer></>
  )
}

export default Footer