"use client"

import { API_ENDPOINTS } from "@/constants/apiEnds"
import { useEffect } from "react"
import { setUserInfo } from "@/store/userSlice"
import { setIsAuthenticated } from "@/store/userSlice"
import { useDispatch } from "react-redux"
import useHttp from "@/hooks/useHttp"

function FetchUserData() {
    const { sendRequests } = useHttp()
  const dispatch = useDispatch()
  useEffect(() => {
    const response = (data: any) => {
      dispatch(setUserInfo(data))
      dispatch(setIsAuthenticated(true))
      }

    const fetchUserProfile = () => {
    sendRequests({
      url_info: {
        url: API_ENDPOINTS.USER_PROFILE,
        is_auth_required: true,
      },
        method: "GET",
      }, response)
    }

    fetchUserProfile()
  }, [])
  return null
}

export default FetchUserData