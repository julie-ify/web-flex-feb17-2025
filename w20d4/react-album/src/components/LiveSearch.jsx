import { Fragment, useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import Error from './Error';
import Filters from './Filters';
import Results from './Results';
import axios from 'axios';

const LiveSearch = () => {
	const [search, setSearch] = useState({
		term: '',
		results: [],
		loading: false,
	});

	const [filters, setFilters] = useState({
		Explicit: true,
		'1900s': true,
		'2000s': true,
		Single: false,
		EP: false,
	});

	const [error, setError] = useState(false);

	const prev = useRef('');

	function showError() {
		setSearch({
			term: '',
			results: [],
			loading: false,
		});

		setError(true);
	}

	useEffect(() => {
		if (prev.current === '' && search.term === '') return;

		setSearch((prev) => ({
			...prev,
			loading: true,
		}));

		prev.current = search.term;

		axios
			.get(
				`https://itunes.apple.com/search?term=${search.term}&country=CA&media=music&entity=album&attribute=artistTerm`
			)
			.then((response) => {
				response.data.results.sort(
					(a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
				);

				setSearch((search) => ({
					...search,
					results: response.data.results,
					loading: false,
				}));
			})
			.catch((error) => {
				showError();
			});
	}, [search.term]);

	return (
		<Fragment>
			<header className="logo">
				<img src="images/brand.png" alt="Brand" />
			</header>
			<main>
				<SearchBar
					loading={search.loading}
					onSearch={(term) => setSearch({ ...search, term })}
				/>
				<Error show={error} onClose={(event) => setError(false)}>
					The server returned an error.
				</Error>
				<Filters
					filters={filters}
					setFilter={(filter, value) =>
						setFilters({ ...filters, [filter]: value })
					}
				/>
				<Results results={search.results} filters={filters} />
			</main>
		</Fragment>
	);
};

export default LiveSearch;
