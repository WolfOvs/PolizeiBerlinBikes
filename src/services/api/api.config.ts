import axios from 'axios';

 export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL = '/api/';
export const MOCK_BASE_URL = `${BASE_URL}`;


export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 60_000, // In milliseconds
});

// export default APIks;

// import axios from 'axios';

// export function createAxiosClient({options, getAuthToken, logout}){
//   const client = axios.create(options);

//   client.interceptors.request.use(
//     (config) =>{
//       if (config.authorization !== false) {

//       }
//     }
//   )
// }
