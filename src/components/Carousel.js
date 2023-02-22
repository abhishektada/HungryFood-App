import React from "react";

export default function cascade(props) {
  const handleOnChange = props.handleOnChange
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
      <div className="carousel-inner" id="carousel">
        <div className="carousel-caption" style={{ zIndex: "2" }}>
          <div className="d-flex">
            <input
              className="form-control me-2 bg-dark text-white"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleOnChange}
            />

          </div>
        </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/100×400?burger"
              className="d-block w-100"
              alt="..."
              style={{  filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/100×400?pastry"
              className="d-block w-100"
              alt="..."
              style={{  filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/100×400?pizza"
              className="d-block w-100"
              alt="..."
              style={{  filter: "brightness(30%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
