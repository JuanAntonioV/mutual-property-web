import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/pages/App.jsx';

import '@/styles/main.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Fancybox } from '@fancyapps/ui';

const queryClient = new QueryClient();

Fancybox.bind('[data-fancybox="gallery"]', {
	//
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
