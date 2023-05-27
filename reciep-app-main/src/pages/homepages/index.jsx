import { useEffect, useReducer, useState } from 'react';
import './styles.css';
import Search from '../../components/search';
import RecipeItems from '../../components/recipes-items';
import { toast } from 'react-toastify';
import FavoriteItems from '../../components/favorite-items';

const dummyData = 'dummydata';
const reducer = (state, action) => {
	switch (action.type) {
		case 'filterFavorites':
			return {
				...state,
				filteredValue: action.value,
			};

		default:
			return state;
	}
};

const initialState = {
	filteredValue: '',
};

const Homepages = () => {

	const [loadingState, setLoadingState] = useState(false);

	const [recipes, setRecipes] = useState([]);

	const [favorites, setFavories] = useState([]);

	const [apiColledSuccess, setApiColledSuccess] = useState(false);

	const [filteredState, dispatch] = useReducer(reducer, initialState);

	const getDataFrom = (getData) => {
		setLoadingState(true);

		async function getRecipes() {
			const apiResponse = await fetch(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=82c153f7a5b449f18356bcdd52d3e62b&query=${getData}`
			);
			const result = await apiResponse.json();
			const { results } = result;

			if (results && results.length > 0) {
				setLoadingState(false);
				setRecipes(results);
				setApiColledSuccess(true);
			}
		}

		getRecipes();
	};

	const addToFavorites = (getCurrentRecipeItem) => {
		let copyFaforites = favorites ? [...favorites] : [];

		const index = copyFaforites ? copyFaforites.findIndex(
			(items) => items.id === getCurrentRecipeItem.id
		) : -1;

		if (index === -1) {
			copyFaforites.push(getCurrentRecipeItem);
			setFavories(copyFaforites);
			toast.success('Added to fovoritos ');
			//* Save the favorites in local stroage
			localStorage.setItem('favoriteItem', JSON.stringify(copyFaforites));
		} else {
			toast.error('Item is already present in favorites ');
		}
	};

	const removeFromFavorites = (getCurrentId) => {
		let copyFaforites = favorites ? [...favorites] : [];
		copyFaforites = copyFaforites.filter((items) => items.id !== getCurrentId);

		setFavories(copyFaforites);
		localStorage.setItem('favoriteItem', JSON.stringify(copyFaforites));
	};

	useEffect(() => {
		const extractInfoLocalStoreOnPage = JSON.parse(
			localStorage.getItem('favoriteItem')
		);
		setFavories(extractInfoLocalStoreOnPage);
	}, []);

	const filteredFavoriteItems = favorites && favorites.filter((items) =>
		items.title.toLowerCase().includes(filteredState.filteredValue)
	)

	return (
		<div className="homepage">
			<Search
				getDataFrom={getDataFrom}
				dummyDataCopy={dummyData}
				apiColledSuccess={apiColledSuccess}
				setApiColledSuccess={setApiColledSuccess}
			/>
			<div className="fovorites_wrapper">
				<h1 className="fovorite_title">Fovorites</h1>

				<div className="search">
					<input
						type="text"
						name="searchfavorites"
						onChange={(event) =>
							dispatch({ type: 'filterFavorites', value: event.target.value })
						}
						value={filteredState.filteredValue}
						placeholder="Search Favorites"
						className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin mr-2 w-72"
					/>
				</div>

				<div className="container">
					{filteredFavoriteItems && filteredFavoriteItems.length > 0
						? filteredFavoriteItems.map((items) => (
							<FavoriteItems
								key={items.id}
								id={items.id}
								image={items.image}
								title={items.title}
								removeFromFavorites={() => removeFromFavorites(items.id)}
							/>
						))
						: null}
				</div>
			</div>
			{loadingState && (
				<div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3">
					<h1 className="text-xl">Loading recipes ! Please wait.</h1>
				</div>
			)}
			<div className="felx_recipes">
				<h1 className="fovorite_title">Found Recipes</h1>
				<div className="container">
					{recipes && recipes.length > 0
						? recipes.map((items) => (
							<RecipeItems
								key={items.id}
								id={items.id}
								image={items.image}
								title={items.title}
								addToFavorites={() => addToFavorites(items)}
							/>
						))
						: null}
				</div>
			</div>
		</div>
	);
};

export default Homepages;
