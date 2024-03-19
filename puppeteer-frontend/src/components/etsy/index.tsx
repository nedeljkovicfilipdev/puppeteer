import { Rocket, Globe2, Wrench, Zap, BookIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'src/app/hooks'
import { getProducts, reset } from 'src/features/etsy/etsySlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app/store'
import { toast } from 'react-toastify'
 
export const Etsy = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { products, isLoading, isError, isSuccess, message } = useSelector((state:RootState) => state.etsy)

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success
      
    }
    dispatch(reset());
  }, [products, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    dispatch(getProducts())
  },[])

  const handleProducts = () => {
    dispatch(getProducts())
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-emerald-300 to-emerald-700">
      <section className="w-full py-32 md:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
                YAY
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
