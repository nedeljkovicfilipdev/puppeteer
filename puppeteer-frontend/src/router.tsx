import React from 'react'
import { createHashRouter, RouteObject } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { getDefaultLayout } from './components/layout'
import HomePage from './pages/home'
import EtsyPage from './pages/etsy'
import { DetailedInfo } from './components/etsy-details'
import { Cart } from './components/cart'
import { Payment } from './components/payment'

export const routerObjects: RouteObject[] = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/etsyScraper',
    Component: EtsyPage,
  },
  {
    path: '/details',
    Component: DetailedInfo
  },
  {
    path: '/cart',
    Component: Cart
  },
  {
    path: '/payment',
    Component: Payment
  }
]

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })
  return createHashRouter(routeWrappers)
}
