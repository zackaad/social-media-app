import axios, {AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse ) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh_token = localStorage.getItem('refresh_token')
                const response = await axios.post('http://localhost:8000/api/token/refresh/', {refresh: refresh_token});
                const access_token = response.data.access

                localStorage.setItem('access_token', access_token);
                console.log(access_token)

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axios(originalRequest)
            }
            catch (error){
                //handle error
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;