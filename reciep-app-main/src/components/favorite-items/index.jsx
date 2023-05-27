import './FavoriteItem.css';
import { Link } from 'react-router-dom';

const FavoriteItems = (props) => {
	const { id, image, title, removeFromFavorites } = props;

	return (
		<div key={id} className="Favoritecard">
			<Link to={`/cardpages/${id}`}>
				<img src={image} alt="Image-Item" />
				<h4>{title}</h4>
			</Link>
			<button
				type="button"
				onClick={removeFromFavorites}
				className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-800 hover:border-red-500 rounded"
			>
				Remove from favorites
			</button>
		</div>
	);
};

export default FavoriteItems;
