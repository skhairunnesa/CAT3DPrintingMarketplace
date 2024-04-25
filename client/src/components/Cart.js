// Cart.js
import React from 'react';

function Cart({ cartItems, removeFromCart, adjustQuantity }) {
    const handleAdjustQuantity = (item, increment) => {
        adjustQuantity(item, increment);
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.structure_id}>
                        ID: {item.structure_id}, Type: {item.structure_type}
                        <div className="quantity-control">
                            <button onClick={() => handleAdjustQuantity(item, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleAdjustQuantity(item, 1)}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;