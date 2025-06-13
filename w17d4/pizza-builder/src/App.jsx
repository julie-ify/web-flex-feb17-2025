import './App.css';
import Header from './components/Header';
import PizzaBuilder from './components/PizzaBuilder';
// import Counter from './components/Counter';

const App = () => {
	return (
		<div>
			<Header username="Mary" />
			<PizzaBuilder />
			{/* <Counter /> */}
		</div>
	);
};

export default App;
