import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import './Home.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Home = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await axios.get(
                    API_BASE_URL + '/api/order/monthly-revenue',
                )
                const data = response.data.data

                const labels = data.map(
                    (item) => `Month ${item.month}/${item.year}`,
                )
                const revenues = data.map((item) => item.totalRevenue)

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Monthly Revenue (USD)',
                            data: revenues,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                })
            } catch (err) {
                setError('Failed to fetch data from the API.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMonthlyRevenue()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="chart-wrapper">
            <div className="chart-container">
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },

                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const value = context.raw
                                        return `${value.toLocaleString('en-US')} USD`
                                    },
                                },
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value) {
                                        return `${value.toLocaleString('en-US')} USD`
                                    },
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default Home
