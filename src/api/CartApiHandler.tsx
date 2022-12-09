import axios from 'axios';

class CartApiHandler {
  private BASE_URL =
    'https://e-commerce-application-backend-production.up.railway.app';

  async addProductToCart(
    accessToken: string,
    productId: string,
    amount: string
  ) {
    try {
      const { data } = await axios.post(
        `${this.BASE_URL}/api/v1/cart/add/${productId}/${amount}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return error.response.status;
      }
    }
  }

  async removeProductFromCart(accessToken: string, productId: string) {
    try {
      const { data } = await axios.delete(
        `${this.BASE_URL}/api/v1/cart/remove/${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return error.response.status;
      }
    }
  }

  async changeProductAmountInCart(
    accessToken: string,
    productId: string,
    amount: string
  ) {
    try {
      const { data } = await axios.put(
        `${this.BASE_URL}/api/v1/cart/update/${productId}/${amount}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return error.response.status;
      }
    }
  }

  async getCart(accessToken: string) {
    try {
      const { data } = await axios.get(`${this.BASE_URL}/api/v1/cart`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return data?.products;
    } catch (error: any) {
      if (error.response) {
        return error.response.status;
      }
    }
  }
}

export default new CartApiHandler();
