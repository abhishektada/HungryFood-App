import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]); 
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let responce = await fetch("http://localhost:5000/home/getdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    responce = await responce.json();
    setFoodItem(responce[0]);
    setFoodCat(responce[1]);
  };

  useEffect(() => {
    if(!localStorage.cart){
      localStorage.setItem("cart",JSON.stringify([]))
    }
    if (localStorage.getItem("key")) {
      loadData();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);
  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="">
      <div>
        <Navbar />
      </div>
      <Carousel handleOnChange={handleOnChange} />
      <div className="container" style={{ marginBottom: "90px" }}>
        {foodCat !== []
          ? foodCat.map((catData) => {
              return (
                <div className="row mb-3" key={catData._id}>
                  <div className=" text-white m-3 fs-3">
                    {catData.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === catData.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filteredData) => {
                        return (
                          <div
                            key={filteredData._id}
                            className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 my-2"
                          >
                            {
                              <Card
                                foodItem={filteredData}
                                options={filteredData.options}
                              />
                            }
                          </div>
                        );
                      })
                  ) : (
                    <div className="text-white">Food not Available</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
