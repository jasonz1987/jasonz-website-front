import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

console.log("BASE_URL", BASE_URL);

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    // proxy: process.env.NODE_ENV === 'development' ? {
    //     protocol: 'https',
    //     host: 'backend.jason-z.com',
    //     port: 443
    // } : false
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // 打印完整的请求信息
        console.log('\n=== 请求信息 ===');
        console.log(`完整URL: ${config.baseURL}${config.url}`);
        console.log(`请求方法: ${config.method?.toUpperCase()}`);
        console.log('请求参数:', {
            params: config.params,
            data: config.data,
            headers: config.headers
        });
        console.log('===============\n');

        return config;
    },
    (error) => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 添加重试逻辑
api.interceptors.response.use(
    (response) => {
        console.log('\n=== 响应信息 ===');
        console.log(`状态码: ${response.status}`);
        console.log('响应数据:', response.data);
        console.log('===============\n');
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // 如果是503错误且未重试过，则重试
        if (error.response?.status === 503 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // 等待2秒后重试
            await new Promise(resolve => setTimeout(resolve, 2000));
            return api(originalRequest);
        }

        console.error('\n=== 响应错误 ===');
        console.error(`错误状态: ${error.response?.status}`);
        console.error('错误信息:', error.response?.data);
        console.error('完整错误:', error);
        console.error('===============\n');

        return Promise.reject(error);
    }
);

export default api;