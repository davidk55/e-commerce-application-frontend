import axios from 'axios';

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  // categories: string[];
  category: string;
  description?: string;
}

class ProductApiHandler {
  private BASE_URL =
    'https://e-commerce-application-backend-production.up.railway.app';

  async getProducts() {
    try {
      const { data } = await axios.get<Product[]>(
        `${this.BASE_URL}/api/v1/products`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  async getProductById(id: string) {
    try {
      const { data } = await axios.get<Product>(
        `${this.BASE_URL}/api/v1/product/${id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
}

export default new ProductApiHandler();
