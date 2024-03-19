import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import etsyService from './etsyService'

// Get product from localStorage
const productString = localStorage.getItem('product');
const product = productString ? JSON.parse(productString) : null;

const initialState = {
  products: product ? product : null,
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
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.products = null
      })
  },
})

export const { reset } = etsySlice.actions
export default etsySlice.reducer