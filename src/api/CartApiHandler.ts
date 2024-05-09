import myAxios from './axiosDefaults';

class CartApiHandler {
  private BASE_URL = myAxios.defaults.baseURL;

  async addProductToCart(
    accessToken: string,
    productId: string,
    amount: string,
  ) {
    try {
      const { data } = await myAxios.post(
        `${this.BASE_URL}/api/v1/cart/add/${productId}/${amount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
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
      const { data } = await myAxios.delete(
        `${this.BASE_URL}/api/v1/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
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
    amount: string,
  ) {
    try {
      const { data } = await myAxios.put(
        `${this.BASE_URL}/api/v1/cart/update/${productId}/${amount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
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
      const { data } = await myAxios.get(`${this.BASE_URL}/api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
