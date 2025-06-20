import { useState, useEffect } from 'react';
import axios from 'axios';

const Data = () => {
	const [topics, setTopics] = useState([]);
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const getPhotos = axios.get('/api/photos');
		const getTopics = axios.get('/api/topics');

		Promise.all([getPhotos, getTopics])
			.then((response) => {
				setPhotos(response[0].data);
				setTopics(response[1].data);
			})
			.catch((e) => console.error('Error fetching data: ', e));
	}, []);

	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:8001/api/topics')
	// 		.then((response) => setTopics(response.data));
	// }, []);

	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:8001/api/photos')
	// 		.then((response) => setPhotos(response.data));
	// }, []);

	// useEffect(() => {
	// 	fetch('http://localhost:8001/api/topics')
	// 		.then((response) => response.json())
	// 		.then((data) => setTopics(data));
	// }, []); // run only when component mounts

	return (
		<div>
			<h1>Fetching Data</h1>
			<div>
				{topics.length > 0 ? (
					topics.map((topic) => {
						return <p key={topic.id}>{topic.title}</p>;
					})
				) : (
					<p>Loading...</p>
				)}
			</div>

			<div>
				{photos.map((photo) => {
					return <p key={photo.id}>{photo.user.name}</p>;
				})}
			</div>
		</div>
	);
};

export default Data;
