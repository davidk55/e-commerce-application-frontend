import axios from 'axios';

class AccountApiHandler {
  private BASE_URL =
    'https://e-commerce-application-backend-production.up.railway.app';

  async register(username: string, password: string) {
    try {
      const { data } = await axios.post(
        `${this.BASE_URL}/api/v1/register`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
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

  async login(username: string, password: string) {
    try {
      const { data } = await axios.post(
        `${this.BASE_URL}/login`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
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
}

export default new AccountApiHandler();
