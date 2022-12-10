import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'https://e-commerce-application-backend-production.up.railway.app',
});

myAxios.defaults.headers.get['Accept'] = 'application/json';

myAxios.defaults.headers.post['Accept'] = 'application/json';
myAxios.defaults.headers.post['Content-Type'] = 'application/json';

myAxios.defaults.headers.put['Accept'] = 'application/json';
myAxios.defaults.headers.put['Content-Type'] = 'application/json';

export default myAxios;
