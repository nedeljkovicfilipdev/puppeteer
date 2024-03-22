import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/app/hooks"
import { addToCart } from "src/features/etsy/etsySlice"

export const DetailedInfo = () => {
    //const {t} = useTranslation()
    const dispatch = useAppDispatch()

    let { state } = useLocation();

    let product = state
    const [hasVariations, setHasVariations] = useState(false)
    const [hasDescription, setHasDescription] = useState(false)

    useEffect(() => {
        console.log(product.variations)
        //Show variations if product has them
        if(product.variations){
            setHasVariations(true)
        }
        //Show description if product has them
        if(product.description){
            setHasDescription(true)
        }
    },[])

    //Simulate adding to cart, adding to cart item inside redux store
    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }

    return(
        <div className="flex min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-500">
            <section className="w-full py-32 md:py-48">
                <div className="container px-4 md:px-6 py-6 bg-white">
                    <div className="grid items-center gap-6 ">
                        <div className="flex flex-col justify-center space-y-4 text-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <img src={product.image} alt={product.name} className="rounded-lg" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
                                    <p className="text-gray-700 text-lg mb-4">{product.price}</p>
                                    <Link to='/etsyScraper' onClick={handleAddToCart} className=" bg-blue-500 text-white px-4 py-4 rounded-lg hover:bg-blue-600 w-80 mx-auto">
                                        Add to Cart
                                    </Link>
                                </div>
                            </div>
                            <div >
                            { hasVariations && (
                                    product.variations.map((variation: any, index: any) => (
                                        <div key={index} className="mb-4 flex flex-col items-center">
                                            <div className="text-lg font-semibold mb-2">{variation.label}</div>
                                            <select className="block items-center w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                                                {variation.options.map((option: any, optionIndex: any) => (
                                                    <option key={optionIndex}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))
                            )}
                            { hasDescription && (
                                    <div className="px-8 py-8" dangerouslySetInnerHTML={{ __html: product.description }} />
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
