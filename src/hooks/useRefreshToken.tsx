import myAxios from '../api/axiosDefaults';

function useRefreshToken() {
  // const { setAuth } = useAuth();

  async function refresh() {
    try {
      const { data } = await myAxios.get(
        `${myAxios.defaults.baseURL}/api/v1/refresh`,
        {
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

  return refresh;
}

export default useRefreshToken;
