import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, emptyCart } from "../store/cart/cartActions";

const Cart = () => {
    const dispatch = useDispatch();
    const addedItems = useSelector((state) => state.cartStore.addedItems);
    const total = useSelector((state) => state.cartStore.total);

    const cartItemRemoveHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        // Handle checkout logic
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {addedItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {addedItems.map((item) => (
                        <div key={item._id}>
                            <h2>{item.title}</h2>
                            <button onClick={() => cartItemRemoveHandler(item._id)}>Remove</button>
                        </div>
                    ))}
                    <h2>Total: ${total}</h2>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;