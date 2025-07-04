import { useState, useEffect } from 'react'
import useHttp from './useHttp'
import { API_ENDPOINTS } from '@/constants/apiEnds'


const useCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { sendRequests } = useHttp()

  // Fetch cart items
  const fetchCartItemsAuthUser = async () => {
    setLoading(true)
    setError(null)
    
    try {
      sendRequests({
        url_info: {
          url: API_ENDPOINTS.CART_LIST,
        },
      }, (response: any) => {
        setCartItems(response)
        setLoading(false)
      })
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const fetchCartItemsUnAuthUser = async () => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      setCartItems(JSON.parse(cartItems))
    }
  }

  // Add item to cart
  const addToCartAuthUser = async (bookId: number | string, quantity = 1) => {
    setLoading(true)
    setError(null)
    
    try {
      sendRequests({
        url_info: {
          url: API_ENDPOINTS.ADD_TO_CART,
          method: 'POST',
        },
        data: {
          book: bookId,
          quantity: quantity,
        },
      }, (response: any) => {
        
      })
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const addToCartUnAuthUser = async (book: any, quantity = 1) => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems)
      cartItemsArray.push({ ...book, quantity })
      localStorage.setItem('cartItems', JSON.stringify(cartItemsArray))
    } else {
      localStorage.setItem('cartItems', JSON.stringify([{ ...book, quantity }]))
    }
  }

  // Remove item from cart
  const removeFromCartAuthUser = async (cartItemId: number | string) => {
    setLoading(true)
    setError(null)
    
    try {
      sendRequests({
        url_info: {
          url: API_ENDPOINTS.DELETE_CART_ITEM(cartItemId),
        },
        method: 'DELETE',
      }, (response: any) => {
        setCartItems(prev => prev.filter((item: any) => item.uuid !== cartItemId))
        setLoading(false)
      })
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const removeFromCartUnAuthUser = async (cartItemId: number | string) => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems)
      localStorage.setItem('cartItems', JSON.stringify(cartItemsArray.filter((item: any) => item.uuid !== cartItemId)))
    }
  }

  // Update item quantity
  const updateQuantityAuthUser = async (cartItemId: number | string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setLoading(true)
    setError(null)
    
    try {
      sendRequests({
        url_info: {
          url: API_ENDPOINTS.UPDATE_CART_QUANTITY(cartItemId),
        },
        method: 'PATCH',
        data: {
          quantity: newQuantity,
        },
      }, (response: any) => {
        setCartItems(prev => prev.map((item: any) => item.uuid === cartItemId ? response : item))
        setLoading(false)
      })
    } catch (err: any ) {
      setError(err.message)
      setLoading(false)
    }
  }

  const updateQuantityUnAuthUser = async (cartItemId: number | string, newQuantity: number) => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems)
      localStorage.setItem('cartItems', JSON.stringify(cartItemsArray.map((item: any) => item.uuid === cartItemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // Get cart total
  const getCartTotalAuthUser = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.book_details.discounted_price * item.quantity)
    }, 0)
  }

  const getCartTotalUnAuthUser = () => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems)
      return cartItemsArray.reduce((total: number, item: any) => total + (item.book_details.discounted_price * item.quantity), 0)
    }
  }

  // Get cart count
  const getCartCountAuthUser = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const getCartCountUnAuthUser = () => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems)
      return cartItemsArray.reduce((count: number, item: any) => count + item.quantity, 0)
    }
  }

  // Check if item exists in cart
  const isItemInCartAuthUser = (bookId: number | string) => {
    return cartItems.some(item => item.book_details.id === bookId)
  }

  const isItemInCartUnAuthUser = (bookId: number | string) => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems)
      return cartItemsArray.some((item: any) => item.book_details.id === bookId)
    }
  }

  // Get item from cart
  const getCartItemAuthUser = (bookId: number | string) => {
    return cartItems.find(item => item.book_details.id === bookId)
  }

  const getCartItemUnAuthUser = (bookId: number | string) => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems)
      return cartItemsArray.find((item: any) => item.book_details.id === bookId)
    }
  }

  return {
    cartItems,
    loading,
    error,
    addToCartAuthUser,
    addToCartUnAuthUser,
    removeFromCartAuthUser,
    removeFromCartUnAuthUser,
    updateQuantityAuthUser,
    updateQuantityUnAuthUser,
    fetchCartItemsAuthUser,
    fetchCartItemsUnAuthUser,
    getCartTotalAuthUser,
    getCartTotalUnAuthUser,
    getCartCountAuthUser,
    getCartCountUnAuthUser,
    isItemInCartAuthUser,
    isItemInCartUnAuthUser,
    getCartItemAuthUser,
    getCartItemUnAuthUser,
  }
}

export default useCart



