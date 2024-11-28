import { toast } from 'react-toastify'
import './List.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const List = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const [list, setList] = useState([])

    const fetchList = async () => {
        const response = await axios.get(`${API_BASE_URL}/api/food`)
        if (response.data.success) {
            setList(response.data.data)
        } else {
            toast.error(response.data.message)
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.delete(`${API_BASE_URL}/api/food`, {
            data: { id: foodId },
        })
        if (response.data.success) {
            await fetchList()
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p
                            onClick={() => removeFood(item._id)}
                            className="cursor"
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List
