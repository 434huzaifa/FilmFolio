import axios from 'axios'
import toast from 'react-hot-toast';

const caxios = axios.create({
	baseURL: import.meta.env.VITE_BACK_END_URL,
})

// Response interceptor to validate JSON responses
caxios.interceptors.response.use(
	(response) => {
		// Check if response is valid JSON (not HTML)
		if (typeof response.data === 'string' && response.data.includes('<!doctype') || response.data.includes('<html')) {
			const error = new Error('Invalid API response: received HTML instead of JSON');
			error.response = response;
			throw error;
		}
		return response;
	},
	(error) => {
		// Handle network or response errors
		if (error.response?.status) {
			const status = error.response.status;
			const message = `API Error (${status}): ${error.message}`;
			
			// Check if response is HTML error page
			if (typeof error.response.data === 'string' && (error.response.data.includes('<!doctype') || error.response.data.includes('<html'))) {
				toast.error('Server returned an HTML error page. Check your API configuration.');
			} else {
				toast.error(message);
			}
		} else {
			toast.error('Network error. Check your connection.');
		}
		return Promise.reject(error);
	}
);

const useAxios = () => {
	return caxios
};
	
export default useAxios;