import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './router'
import { store } from './app/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={createRouter()} />
    </Provider>
  )
}
