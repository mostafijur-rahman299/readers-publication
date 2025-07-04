import { useState, useEffect } from 'react'
import useHttp from './useHttp'
import { API_ENDPOINTS } from '@/constants/apiEnds'

const useCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { sendRequests } = useHttp()

  // Fetch cart items
  const fetchCartItems = async () => {
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

  // Add item to cart
  const addToCart = async (bookId: number | string, quantity = 1) => {
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
        // Refresh cart items after adding
        fetchCartItems()
      })
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeFromCart = async (cartItemId: number | string) => {
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

  // Update item quantity
  const updateQuantity = async (cartItemId: number | string, newQuantity: number) => {
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

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.book_details.discounted_price * item.quantity)
    }, 0)
  }

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  // Check if item exists in cart
  const isItemInCart = (bookId: number | string) => {
    return cartItems.some(item => item.book_details.id === bookId)
  }

  // Get item from cart
  const getCartItem = (bookId: number | string) => {
    return cartItems.find(item => item.book_details.id === bookId)
  }

  // Initialize cart on mount
  useEffect(() => {
    fetchCartItems()
  }, [])

  return {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchCartItems,
    getCartTotal,
    getCartCount,
    isItemInCart,
    getCartItem,
  }
}

export default useCart



