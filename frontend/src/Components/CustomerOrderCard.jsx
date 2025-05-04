// src/components/OrderCard.jsx
import React from 'react';

const OrderCard = ({ order }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 p-4 transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800">Order from: {order.restaurantEmail}</h3>
            <p className="text-gray-600">Restaurant ID: {order.restaurantId}</p>
            <p className="text-gray-600">Total Amount: ₹{order.totalAmount}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <p className="text-gray-600">Created At: {new Date(order.createdAt).toLocaleString()}</p>
            <h4 className="mt-2 font-semibold">Items:</h4>
            <ul className="list-disc pl-5">
                {order.items.map((item, index) => (
                    <li key={index}>
                        {item.product.name} (Quantity: {item.quantity})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderCard;
