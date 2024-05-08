// Cart.js
import React, { useEffect } from 'react';

function Cart({ cartItems, removeFromCart, adjustQuantity }) {
    const [data, setData] = useState([]);
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [cartVisible, setCartVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState('/');

    useEffect(() => {
        fetchData();
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

}

export default Cart;
