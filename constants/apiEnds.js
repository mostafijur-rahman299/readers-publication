const BACKEND_URL = "http://localhost:8000"

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL}/api/token/`,
  REFRESH_TOKEN: `${BACKEND_URL}/api/token/refresh/`,
  SIGNUP: `${BACKEND_URL}/user/api/v1/auth/registration/`,
  GOOGLE_LOGIN: `${BACKEND_URL}/user/api/v1/auth/google-login/`,
  FORGOT_PASSWORD: `${BACKEND_URL}/user/api/v1/auth/forgot-password/`,
  UPDATE_PASSWORD: `${BACKEND_URL}/user/api/v1/auth/update-password/`,
  USER_PROFILE: `${BACKEND_URL}/user/api/v1/user/profile/`,
}
