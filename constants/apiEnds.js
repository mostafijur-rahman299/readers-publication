const BACKEND_URL = "http://localhost:8000"

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL}/api/token/`,
  SIGNUP: `${BACKEND_URL}/user/api/v1/auth/registration/`,
  GOOGLE_LOGIN: `${BACKEND_URL}/user/api/v1/auth/google-login/`,
}
