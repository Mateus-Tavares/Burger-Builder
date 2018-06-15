import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://beeingtogether-9411e.firebaseio.com'
});

export default instance;
