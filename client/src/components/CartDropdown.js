// CartDropdown.js
import React from 'react';
import Cart from './Cart';

function CartDropdown({ cartItems, removeFromCart, adjustQuantity }) {
    return (
        <div className="dropdown-content">
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} adjustQuantity={adjustQuantity} />
        </div>
    );
}

export default CartDropdown;
