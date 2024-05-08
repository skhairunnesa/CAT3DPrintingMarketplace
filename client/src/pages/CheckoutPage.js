import "../styles/CheckoutPage.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
    const [cartData, setCartData] = useState([]);
    const [orderID, setOrderID] = useState('');

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = () => {
        axios.get('http://localhost:5000/addCart')
            .then(response => {
                setCartData(response.data);
            })
            .catch(error => console.error('Error fetching cart data:', error));
    }

    const submitCartDataToOrders = () => {
        const data = {
            orderID: generateOrderID(), // Generate or fetch the orderID
            addtocart: cartData // Pass the cartData array
            
        };
        axios.post('http://localhost:5000/orders/add', data)
            .then(response => {
                console.log('Order submitted successfully:', response.data);
                setCartData([]);
            })
            .catch(error => console.error('Error submitting order:', error));
        
    }

    function clearCart(id){
        axios.delete(`http://localhost:5000/addCart/${id}`, {data: {cartData}})
            .then(response => {
                console.log(`Deleted cart item`);
            })
            .catch(error => {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log('Error', error.message);
                }
                console.log(error.config);
            });
        
        // fetch(`http://localhost:5000/addCart/${id}`,{
        //     method: 'DELETE'
        // }).then((result)=>{
        //     result.json().then((resp)=>{
        //         console.warn(resp)
        //     })
        // })
    }

    const generateOrderID = () => {
        // Implement your logic to generate or fetch the orderID
        // For example, you can generate a random ID or use a timestamp
        return Math.random().toString(36).substring(7);
    }

    return (
        <div className="checkout-container">
            <h1 style={{marginLeft:"40%"}}>Checkout</h1>
            {cartData.length > 0 ? (
                cartData.map(item => (
                    <div className="cart-item" key={item.user_id}>
                        
                        <p><strong>User ID:</strong> {item.user_id}</p>
                        <p><strong>Designer:</strong> {item.designer}</p>
                        <p><strong>Product Name:</strong> {item.product_id}</p>
                        <p><strong>Beds:</strong> {item.numBed}</p>
                        <p><strong>Baths:</strong> {item.numBath}</p>
                        <p><strong>Quantity:</strong> {item.q}</p>
                        <p><strong>Total Cost:</strong> {item.total_cost}</p>
                        <button onClick={() => clearCart(item.user_id)} style={{justifyContent: "flex-end"}}>Remove</button>
                    </div>
                ))
            ) : (
                <div>No items in your cart</div>
            )}

            <button onClick={submitCartDataToOrders} style={{width:"150px", height:"60px", fontSize:"18px"}}>Submit Order</button>
        </div>
    );
}

export default CheckoutPage;