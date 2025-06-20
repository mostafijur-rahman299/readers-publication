const BACKEND_URL = "http://localhost:8000"

export const API_ENDPOINTS = {
  LOGIN: `${BACKEND_URL}/api/token/`,
  REFRESH_TOKEN: `${BACKEND_URL}/api/token/refresh/`,
  SIGNUP: `${BACKEND_URL}/user/api/v1/auth/registration/`,
  GOOGLE_LOGIN: `${BACKEND_URL}/user/api/v1/auth/google-login/`,
  FORGOT_PASSWORD: `${BACKEND_URL}/user/api/v1/auth/forgot-password/`,
  UPDATE_PASSWORD: `${BACKEND_URL}/user/api/v1/auth/update-password/`,
  USER_PROFILE: `${BACKEND_URL}/user/api/v1/user/profile/`,
  CATEGORIES: `${BACKEND_URL}/book/api/v1/categories/?is_featured=true`,
  HOME_CAROUSEL: `${BACKEND_URL}/core/api/v1/home-carousel/`, 
  GENERAL_DATA: `${BACKEND_URL}/core/api/v1/general-data/`,
  BLOG_LIST: `${BACKEND_URL}/blog/api/v1/list/`,
  BLOG_DETAIL: (slug) => `${BACKEND_URL}/blog/api/v1/detail/${slug}/`,
  TESTIMONIALS: `${BACKEND_URL}/core/api/v1/testimonials/`,
}
