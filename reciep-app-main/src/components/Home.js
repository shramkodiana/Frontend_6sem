import Navbar from './Navbar';
import Homepages from '../pages/homepages/index';

const Home = () => {
	return (
		<>
			<Navbar />
			<div className="Recipes_Style">
				<Homepages />
			</div>
		</>
	);
};

export default Home;
