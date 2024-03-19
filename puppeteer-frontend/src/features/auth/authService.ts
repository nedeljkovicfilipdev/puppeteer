import axios from 'axios'

const API_URL = '/users/'

// Register user
const register = async (userData: any) => {
  const response = await axios.post('http://localhost:4000/users/registerUser', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData: any) => {
  const response = await axios.post('http://localhost:4000/users/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
}

export default authService