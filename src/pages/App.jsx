import RouterScroll from '@/helpers/RouterScroll';
import Router from '@/routers/Router';

export default function App() {
	return (
		<>
			<RouterScroll>
				<Router />
			</RouterScroll>
		</>
	);
}
