import axios from 'axios'
import './Orders.css'
import { assets } from '../../assets/assets'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const Orders = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
        const response = await axios.get(`${API_BASE_URL}/api/order`)
        if (response.data.success) {
            setOrders(response.data.data)
        } else {
            toast.error(response.data.message)
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.put(API_BASE_URL + '/api/order', {
            orderId,
            status: event.target.value,
        })
        if (response.data.success) {
            await fetchAllOrders()
            toast.success(response.data.message)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])

    return (
        <div className="order add">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + ' x ' + item.quantity
                                    } else {
                                        return (
                                            item.name +
                                            ' x ' +
                                            item.quantity +
                                            ', '
                                        )
                                    }
                                })}
                            </p>
                            <p className="order-item-name">
                                {order.address.firstName +
                                    ' ' +
                                    order.address.lastName}
                            </p>
                            <div className="order-item-address">
                                <p>{order.address.street + ', '}</p>
                                <p>
                                    {order.address.city +
                                        ', ' +
                                        order.address.state +
                                        ', ' +
                                        order.address.country +
                                        ', ' +
                                        order.address.zipcode}
                                </p>
                            </div>
                            <p className="order-item-phone">
                                {order.address.phone}
                            </p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select
                            onChange={(event) =>
                                statusHandler(event, order._id)
                            }
                            value={order.status}
                        >
                            <option value="Food Processing">
                                Food Processing
                            </option>
                            <option value="Out for delivery">
                                Out for delivery
                            </option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
