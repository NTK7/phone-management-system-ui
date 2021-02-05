import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Order from './pages/Order/Order';
import AddInventory from './pages/AddInventory/AddInventory';
import ViewInventory from './pages/ViewInventory/ViewInventory';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
	return (
		// Set up React Router
		<Router>
			<div className="app">
				<Switch>
					<Route path="/order">
						<Header />
						<Order />
						<Footer />
					</Route>
					<Route path="/add+inventory">
						<Header />
						<AddInventory />
						<Footer />
					</Route>
					<Route path="/view+inventory">
						<Header />
						<ViewInventory />
						<Footer />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
