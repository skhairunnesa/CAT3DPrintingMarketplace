import axios from 'axios';
import React, { useState, useEffect} from 'react';


function OrdersPage() {
    const [orderId, setOrderId] = useState('');
    const [orderSearch, setOrderSearch] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);

    //grabs the data from orders
    useEffect(() => {
        axios.get(`http://localhost:5000/orders`)
        .then(response => {
            console.log("your orders:...", response);
            setOrders(response.data);
            setOrderSearch(response.data);
        })
        .catch(error => {
            console.error("Error fetching orders:...", error);
        }); 
    }, [])   

    const handleSearch = () =>{
        if(orderId !== ''){
            setShowResults(true);
            axios.get(`http://localhost:5000/orders?orderID=${orderId}`)
            .then(response => {
                console.log("your search came up with:...", response);
                setOrderSearch(response.data);
                setOrderSearch(orderSearch => orderSearch.filter(orderId => orderSearch.orderID !== orderId));
            })
            .catch(error => {
                console.error("Error fetching orders:...", error);
            });
        }
    }

    const clearSearch = () => {
        setShowResults(false);
        setOrderId("");
    }

    

    return (
        <div style={{marginLeft: '20px'}}>
            <h1>Your Orders</h1>
            <div>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter OrderID to Search"
                />
                <button id="search" onClick={handleSearch}>Search</button> <button id="clear" onClick={clearSearch}>Clear</button>
            </div>
            {showResults && (
                <div class="searchResults">
                    <h2>Search Results</h2>
                    {orders.length > 0 ? (
                        orderSearch.map((order) => (
                            <div style={{marginLeft: "20px"}} key={order._id.$oid}>
                                <h3>Order ID: {order.orderID}</h3>
                                <ul>
                                    {order.structuresOrdered.map((structure) => (
                                        <li key={structure._id.$oid}>
                                            User ID: {structure.user_id}, Designer: {structure.designer}, Product ID: {structure.product_id}, Beds: {structure.numBed}, Baths: {structure.numBath}, Quantity: {structure.q}, Total Cost: {structure.total_cost} {}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div>no results found</div>
                    )}
                </div>
            )}
            <h2>Past Orders</h2>
            {error && <p>{error}</p>}
            {orders.length > 0 ? (
                <div id="order-hist" style={{marginLeft: "20px"}}>
                    {orders.map((order) => (
                        <div key={order._id.$oid}>
                            <h3>Order ID: {order.orderID}</h3>
                            <ul>
                                {order.structuresOrdered.map((structure) => (
                                    <li key={structure._id.$oid}>
                                        User ID: {structure.user_id}, Designer: {structure.designer}, Product ID: {structure.product_id}, Beds: {structure.numBed}, Baths: {structure.numBath}, Quantity: {structure.q}, Total Cost: {structure.total_cost} {}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <div>You have no previous Orders</div>
            )}
        </div>
    );
}

export default OrdersPage;
