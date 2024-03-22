import { Rocket, Globe2, Wrench, Zap, BookIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'src/app/hooks'
import { getProducts, reset } from 'src/features/etsy/etsySlice'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app/store'
import { toast } from 'react-toastify'
 
export const Etsy = () => {
  //const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state:RootState) => state.etsy
  )
  const [displayedProducts, setDisplayedProducts] = useState<Array<any>>([])

  //Loading more products
  const loadMoreProducts = () => {
    setDisplayedProducts((prevProducts) => [
      ...prevProducts,
      ...products.slice(prevProducts.length, prevProducts.length + 10)
    ])
  }

  //Infinite scrolling
  const handleScroll = () => {
    if( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight ){
      loadMoreProducts()
    }
  }

  //Toaster for errors and successes
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message)
    }
  }, [ isError, isSuccess]);

  //Get products from redux store
  useEffect(() => {
    dispatch(reset())
    if(!products){
      dispatch(getProducts())
    }
  },[products])

  //Loading first products on render
  useEffect(() => {
    if(products){
      setDisplayedProducts(products.slice(0, 10))
    }
  }, [products])

  //When end of page, load more products
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
   })

  return (
    <div className="flex min-h-screen bg-zinc">
      <section className="w-full py-32 md:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              {isLoading ? (
                <div className="text-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
              ) : isError ? (
                <div>
                  <p>Error loading products. Please try again later.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Array.isArray(displayedProducts) && displayedProducts.map((product:any, index:any) => (
                    <Link to={'/details'} state={product} key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white bg-opacity-80 relative">
                      <img className="w-full -z-1" src={product.image} alt={product.name} />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{product.name}</div>
                        <p className="text-gray-700 text-base">{product.price}</p>
                      </div>
                      <div className="absolute bottom-0 w-full text-center left-0 right-0">
                        <a href={product.link} className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">View Product</a>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
