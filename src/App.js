import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Order from './pages/Order/Order';
import AddInventory from './pages/AddInventory/AddInventory';
import ViewInventory from './pages/ViewInventory/ViewInventory';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function App() {
	// You can use this variable with the useSelector method to use the user details anywhere
	const user = useSelector(selectUser);

	return (
		// Set up React Router
		<Router>
			<div className="app">
				<Switch>
					<Route exact path="/order">
						{user ? (
							<>
								<Header />
								<Order />
								<Footer />
							</>
						) : (
							<Redirect to="/" />
						)}
					</Route>
					<Route exact path="/add+inventory">
						{user ? (
							<>
								<Header />
								<AddInventory />
								<Footer />
							</>
						) : (
							<Redirect to="/" />
						)}
					</Route>
					<Route exact path="/view+inventory">
						{user ? (
							<>
								<Header />
								<ViewInventory />
								<Footer />
							</>
						) : (
							<Redirect to="/" />
						)}
					</Route>
					<Route exact path="/signOut">
						{user ? (
							<>
								<Header />
								<SignUp />
								<Footer />
							</>
						) : (
							<Redirect to="/" />
						)}
					</Route>
					<Route exact path="/home">
						{user ? (
							<>
								<Header />
								<Home />
								<Footer />
							</>
						) : (
							<Redirect to="/" />
						)}
					</Route>
					<Route path="/">
						<Redirect to="/" />
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
