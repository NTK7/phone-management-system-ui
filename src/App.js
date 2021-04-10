import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Order from './pages/Order/Order';
import AddInventory from './pages/AddInventory/AddInventory';
import ViewInventory from './pages/ViewInventory/ViewInventory';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

// You can use this variable with the useSelector method to use the user details anywhere

function App() {
	const user = useSelector(selectUser);

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
					<Route path="/signUp">
						<Header />
						<SignUp />
						<Footer />
					</Route>
					<Route path="/home">
						<Header />
						<Home />
						<Footer />
					</Route>
					<Route path="/">
						<Header />
						<SignUp />
						<Footer />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
