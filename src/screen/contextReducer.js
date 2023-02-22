import { createContext, useContext, useReducer,useEffect } from "react";

const StateContext = createContext();
const StateDispatchContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      let addState = [
        ...state,
        {
          id: action.id,
          price: action.price,
          name: action.name,
          qnt: action.qnt,
          size: action.size,
          img: action.img,
        },
      ]
      // localStorage.removeItem("cart")
      localStorage.setItem("cart",JSON.stringify(addState))
      return addState ;

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      // localStorage.removeItem("cart")
      localStorage.setItem("cart",JSON.stringify(newArr))
      return newArr;
    case "DROP":
      let empArray = [];
      // localStorage.removeItem("cart")
      localStorage.setItem("cart",JSON.stringify(empArray))
      return empArray;
    case "UPDATE":
      let arr = [...state];
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element.id === action.id && element.size === action.size) {
          let food = arr[index];
          arr[index] = {
            ...food,
            qnt: parseInt(action.qnt) + parseInt(food.qnt),
            price: action.price + food.price,
          };
          break;
        }
      }
      // localStorage.removeItem("cart")
      localStorage.setItem("cart",JSON.stringify(arr))
      // }
      return arr;
    // });
    // return arr;
    default:
  }
};


const local =JSON.parse(localStorage.getItem("cart"))

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, !local?[]:[...local]);
  return (
    <StateDispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </StateDispatchContext.Provider>
  );
};

export const useCart = () => useContext(StateContext);
export const useDispatchCart = () => useContext(StateDispatchContext);
