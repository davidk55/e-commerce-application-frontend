import axios from 'axios';

const myAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://e-commerce-application.up.railway.app'
      : 'http://localhost:8080',
});

myAxios.defaults.headers.get['Accept'] = 'application/json';

myAxios.defaults.headers.post['Accept'] = 'application/json';
myAxios.defaults.headers.post['Content-Type'] = 'application/json';

myAxios.defaults.headers.put['Accept'] = 'application/json';
myAxios.defaults.headers.put['Content-Type'] = 'application/json';

export default myAxios;
