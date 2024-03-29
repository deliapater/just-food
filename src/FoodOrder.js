import React, { Fragment, useState } from "react";
import foodOrderStyles from "./FoodOrder.module.css";
import { useContext } from "react";
import { foodItemsContext } from "./App";
import ErrorFunctionalBoundary from "./ErrorFunctionalBoundary";

const FoodOrder = (props) => {
  const selectedFood = props.food;
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(selectedFood.price);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isErrorCatched, setIsErrorCatched] = useState(false);

  const menuItems = useContext(foodItemsContext);

  const handleQuantityChange = (event) => {
    try {
      setTotalAmount(selectedFood.price * event.target.value);
      setQuantity(event.target.value);
    } catch {
      setIsErrorCatched(true);
    }
  };

  const handleClick = () => {
    setIsOrdered(true);
    menuItems.map((item) => {
      if (item.id === selectedFood.id) {
        item.quantity = item.quantity - quantity;
      }
    });
  };

  return (
    <Fragment>
      {!isErrorCatched && (
        <Fragment>
          <h4 data-testid="sel-food-title" className={foodOrderStyles.subTitle}>
            {selectedFood.name}
          </h4>
          <img
            className={foodOrderStyles.selFoodImg}
            src={require(`../public/images/${selectedFood.image}`)}
            alt={selectedFood.name}
          />
          <ul className={foodOrderStyles.ulFoodDetails}>
            <li>
              <p className={foodOrderStyles.selFoodDesc}>{selectedFood.desc}</p>
            </li>
            <li>
              <p className={foodOrderStyles.selFoodPrice}>{totalAmount}$</p>
            </li>
            <li className={foodOrderStyles.selQuantity}>
              <label>Quantity</label>
              <input
                type="number"
                defaultValue={1}
                className={foodOrderStyles.quantity}
                min="1"
                max="10"
                onChange={handleQuantityChange}
                data-testid="sel-item-qty"
              />
            </li>

            <li className={foodOrderStyles.liDetails}>
              <label for="name"></label>
              <input
                type="text"
                className={foodOrderStyles.inputFields}
                id="name"
                name="name"
                placeholder="Your Name"
              />
            </li>
            <li>
              <label for="mobile"></label>
              <input
                type="text"
                className={foodOrderStyles.inputFields}
                id="mobile"
                name="mobile"
                placeholder="Your mobile number"
              />
            </li>

            <li>
              <button
                data-testid="submit-order-btn"
                className={`${foodOrderStyles.btn} ${foodOrderStyles.btnOrder}`}
                onClick={handleClick}
              >
                Submit Order
              </button>
              <button
                data-testid="return-to-menu-btn"
                className={`${foodOrderStyles.btn} ${foodOrderStyles.btnReturnMenu}`}
                onClick={props.returnToMenu}
              >
                Return to Menu
              </button>
            </li>
            {isOrdered && (
              <li className={foodOrderStyles.liMessage}>
                <label data-testid="order-submited-msg">
                  Order Submitted! You will receive an SMS to once ready for
                  pickup.
                </label>
              </li>
            )}
          </ul>
        </Fragment>
      )}
      {isErrorCatched && <ErrorFunctionalBoundary />}
    </Fragment>
  );
};

export default FoodOrder;
