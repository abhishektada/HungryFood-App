import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/home/myorderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      setOrderData(response);
    });
  };
  console.log(orderData);
  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        className="container "
        style={{ marginBottom: "100px", marginTop: "75px" }}
      >
        <div className="row">
          {orderData !== {}
            ? Array(orderData).map((data,i) => {
                return data.orderData ? (
                  data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return item.map((arrayData, i) => {
                        return (
                       
                            arrayData.Order_date ? (
                              <div key={i} className="m-auto mt-5 text-white fs-4 text-center ">
                                {(data = arrayData.Order_date)}
                                <hr />
                              </div>
                            ) : (
                              <div key={i} className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3">
                                <div
                                  className="card mt-3"
                                  style={{
                                    width: "20rem",
                                    maxHeight: "360px",
                                  }}
                                >
                                  <img
                                    src={arrayData.img}
                                    className="card-img-top"
                                    alt="..."
                                    style={{
                                      height: "120px",
                                      objectFit: "fill",
                                    }}
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      {arrayData.name}
                                    </h5>
                                    <div
                                      className="container w-100 p-0"
                                      style={{ height: "38px" }}
                                    >
                                      <span className="m-1">
                                        {arrayData.qnt}
                                      </span>
                                      <span className="m-1">
                                        {arrayData.size}
                                      </span>
                                      <span className="m-1">{data}</span>
                                      <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                        ₹{arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                        
                        );
                      });
                    })
                ) : (
                  <div key={i}
                    className="container fs-1 text-white text-center"
                    style={{ marginTop: "100px" }}
                  >
                    Order somthing...
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <Footer />
    </div>
  );
}
