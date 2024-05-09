import myAxios from './axiosDefaults';

class AccountApiHandler {
  private BASE_URL = myAxios.defaults.baseURL;

  async register(username: string, password: string) {
    try {
      const { data } = await myAxios.post(
        `${this.BASE_URL}/api/v1/register`,
        { username: username, password: password },
        {
          withCredentials: true,
        },
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
      const { data } = await myAxios.post(
        `${this.BASE_URL}/login`,
        { username: username, password: password },
        {
          withCredentials: true,
        },
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return error.response.status;
      }
    }
  }

  async logout() {
    try {
      const { data } = await myAxios.get(
        `${this.BASE_URL}/api/v1/logout`,

        {
          withCredentials: true,
        },
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
