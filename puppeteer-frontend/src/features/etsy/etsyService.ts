import axios from 'axios'

const API_URL = '/etsy/'

// Get products
const products = async () => {
  try {
    let products = JSON.parse(localStorage.getItem('products') || '[]')
    
    if (products.length === 0) {
      const response = await axios.get('http://localhost:4000/etsy/getProducts');
      console.log(response);

      if (response.data) {
        products = response.data;
        localStorage.setItem('products', JSON.stringify(products));
      }
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

const addToCart = (product: any) => {
  try{
    if(product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      cart.push(product)
      localStorage.setItem('cart', JSON.stringify(cart))
      return cart
    }
  } catch (error) {
    console.log("Error adding to cart")
    throw error
  }
}

const etsyService = {
    products,
    addToCart,
}

export default etsyService