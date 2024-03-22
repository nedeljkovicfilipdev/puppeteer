import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

//Payment simulation with navigating to the home page 
export const Payment = () => {

    let { state } = useLocation()
    let totalPrice = state[1]
    let currency = state[2]

    const message = 'Payment has been successful'

    useEffect(() => {
        console.log(state)
    })

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-500">
            <section className="w-full py-32 md:py-48">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6">
                        <div className="flex flex-col justify-center space-y-4 text-center">
                            <div className="text-xl font-bold text-slate-800">Total price: {totalPrice} {currency}</div>
                            <div className="flex justify-center">
                                <Link to='/' state={message} className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 w-48">Proceed with payment</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}