"use client"

import { API_ENDPOINTS } from "@/constants/apiEnds"
import { useEffect } from "react"
import { setUserInfo } from "@/store/userSlice"
import { setIsAuthenticated } from "@/store/userSlice"
import { useDispatch } from "react-redux"
import useHttp from "@/hooks/useHttp"
import { setGeneralData } from "@/store/generalData"
import { setCartCount } from "@/store/cart"

function FetchRootData() {
    const { sendRequests: fetchGeneralData } = useHttp()
    const { sendRequests: fetchUserProfileData } = useHttp()
    const dispatch = useDispatch()


    const fetchUserProfile = () => {
      fetchUserProfileData({
        url_info: {
          url: API_ENDPOINTS.USER_PROFILE,
          is_auth_required: true,
        },
          method: "GET",
        }, (res: any) => {
          dispatch(setUserInfo(res))
          dispatch(setIsAuthenticated(true))
          dispatch(setCartCount(res.cart_count))
        })
      }

    const handleFtchGeneralData = () => {
      fetchGeneralData({
        url_info: {
          url: API_ENDPOINTS.GENERAL_DATA,
        },
        }, (res: any) => {
          dispatch(setGeneralData(res))
        })
      }


    useEffect(() => {
      fetchUserProfile()
      handleFtchGeneralData()
    }, [])


  return null
}

export default FetchRootData