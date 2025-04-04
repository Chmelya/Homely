import { Link } from 'react-router';
import { ROUTES } from '~/routes/paths';

const MainPage = () => {
	return (
		<>
			<Link to={ROUTES.createRequest}>Create request</Link>
		</>
	);
};

export default MainPage;
