import axios from 'axios';

const instance = axios.create({
  baseURL: "https://linkedin-clone-backend-vq07.onrender.com", // your backend URL
});

export default instance;
