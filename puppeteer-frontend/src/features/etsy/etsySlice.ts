import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import etsyService from './etsyService'

// Get product from localStorage
const productString = localStorage.getItem('product');
const cartString = localStorage.getItem('cart')
const product = productString ? JSON.parse(productString) : null;
const cart = cartString ? JSON.parse(cartString) : null

const initialState = {
  products: product ? product : null,
  cart: cart ? cart : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get products
export const getProducts = createAsyncThunk('etsy/products', async () => {
  try {
    return await etsyService.products()
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    throw new error(message)
  }
})

//Add to cart
export const addToCart = createAsyncThunk('etsy/cart', async (product: any) =>{
  try{
    return await etsyService.addToCart(product)
  } catch ( error: any){
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
    return message
  }
})

export const etsySlice = createSlice({
  name: 'etsy',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
        state.message = 'Products retrieved successfully'
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = "Products can't be retrieved"
        state.products = null
        state.cart = null
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cart = action.payload
        state.message = 'Product added to cart successfully'
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.cart = null
      })
  },
})

export const { reset } = etsySlice.actions
export default etsySlice.reducer