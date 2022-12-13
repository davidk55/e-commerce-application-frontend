import axios from 'axios';
import myAxios from './axiosDefaults';

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
  private BASE_URL = myAxios.defaults.baseURL;

  async getProducts() {
    try {
      const { data } = await myAxios.get<Product[]>(
        `${this.BASE_URL}/api/v1/products`
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
      const { data } = await myAxios.get<Product>(
        `${this.BASE_URL}/api/v1/product/${id}`
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

  async createProduct(accessToken: string, product: Product) {
    try {
      const { data } = await myAxios.post<Product>(
        `${this.BASE_URL}/api/v1/product/create`,
        product,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return error.response.status;
      }
    }
  }

}

export default new ProductApiHandler();
