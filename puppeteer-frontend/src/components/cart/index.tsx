import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { RootState } from "src/app/store"

//Cart page
export const Cart = () => {
    const { cart, isLoading, isError, isSuccess, message } = useSelector(
        (state:RootState) => state.etsy
    )

    const [cartProducts, setCartProducts] = useState<Array<any>>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [currency, setCurrency] = useState<string>('')
    const [showCart, setShowCart] = useState(false)

    useEffect(() => {
        if(cart && cart.length > 0){
            setCartProducts(cart)
            setShowCart(true)
            //Sum of prices inside cart
            setTotalPrice(cart.reduce((total:number, product:any) => total + parseFloat(product.price.replace('USD ', '')), 0)) 
            setCurrency(cart[0].price.split(' ')[0])
        }else{
            toast.info(('Cart is empty, add products first !'))
        }
    }, [cart])

    return(
        <div className="flex min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-500">
            <section className="w-full py-32 md:py-48">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6">
                        <div className="flex flex-col justify-center space-y-4 text-center">
                            {showCart ? (
                                <div>
                                    <div className="text-xl font-bold text-slate-800">Total price: {totalPrice} {currency }</div>
                                    <div className="flex justify-center">
                                        <Link to='/payment' state={[cartProducts, totalPrice, currency]} className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 w-48">Go to checkout</Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {Array.isArray(cartProducts) && cartProducts.map((product:any, index:any) => (
                                            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white bg-opacity-80 relative">
                                                <img className="w-full" src={product.image} alt={product.name} />
                                                <div className="px-6 py-4">
                                                    <div className="font-bold text-xl mb-2">{product.name}</div>
                                                    <p className="text-gray-700 text-base">{product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ):(
                            <div>
                                
                            </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}