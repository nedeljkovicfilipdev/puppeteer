import axios from 'axios'

const API_URL = '/etsy/'

// Get products
const products = async () => {
  try {
    const response = await axios.get('http://localhost:4000/etsy/getProducts');
    console.log("");
    console.log(response);
    
    if (response.data) {
      localStorage.setItem('products', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};


const etsyService = {
    products,
}

export default etsyService