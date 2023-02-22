import React, { useState, useEffect, useRef } from "react";
import { useCart, useDispatchCart } from "../screen/contextReducer";

export default function Card(props) {
  const [qnt, setQnt] = useState(1);
  const [size, setSize] = useState("");
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  const foodItem = props.foodItem;
  const options = props.options[0];
  const priceOptions = Object.keys(props.options[0]);
  const finalPrice = qnt * parseInt(options[size]);

  const capitalize = (str) => {
    let cpStr = str.charAt(0).toUpperCase() + str.slice(1);
    return cpStr;
  };
  const handleAddCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id&&item.size===size) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qnt: qnt,
          size:size
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qnt: qnt,
          size: size,
          img: foodItem.img,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      price: finalPrice,
      name: foodItem.name,
      qnt: qnt,
      size: size,
      img: foodItem.img,
    });
  };
  const onChangeSize = (e) => {
    setSize(e.target.value);
  };
  const onChangeQnt = (e) => {
    setQnt(e.target.value);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div
      className="card bg-dark text-white border-1"
      style={{ width: "20rem", maxHeight: "30rem" }}
    >
      <img
        src={foodItem.img}
        className="card-img-top"
        style={{ height: "15rem", objectFit: "fill" }}
        alt="foodimg"
      />
      <div className="card-body">
        <h5 className="card-title text-center">{foodItem.name}</h5>
        <div className="d-flex justify-content-center container mt-4">
          <select
            className="h-100 p-2 border-1 rounded bg-success mx-auto"
            name="orderCount"
            id="orderCount"
            onChange={onChangeQnt}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option className="h-100 p-1" value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="h-100 border-1 rounded mx-auto p-2 bg-success"
            name="orderSize"
            id="orderSize"
            ref={priceRef}
            onChange={onChangeSize}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {capitalize(data)}
                </option>
              );
            })}
          </select>
        </div>
        <hr />
        <div className="d-flex justify-content-center mt-1 mb-2">
          <button
            className="btn text-black fw-bold btn-success mx-auto"
            onClick={handleAddCart}
          >
            {" "}
            Add to cart
          </button>
          <p className="fw-bold fs-5 text-center mx-auto">₹{finalPrice}/-</p>
        </div>
      </div>
    </div>
  );
}
