import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';

function Home() {
	const history = useHistory();

	const [displayInventoryOptions, setDisplayInventoryOptions] = useState(false);
	return (
		<div className="home">
			<div className="home__nav">
				<h4>Phone Shop</h4>
			</div>
			<div className="home__cards container">
				{displayInventoryOptions ? (
					<div className="home__cardsInventory" onMouseLeave={() => setDisplayInventoryOptions(false)}>
						<p>
							<Link to="/add+inventory">ADD INVENTORY</Link>
						</p>
						<p>
							<Link to="/view+inventory">VIEW INVENTOR</Link>
						</p>
					</div>
				) : (
					<div className="home__cardsInventory" onMouseEnter={() => setDisplayInventoryOptions(true)}>
						<p>INVENTORY</p>
					</div>
				)}

				<div className="home__cardsOrder" onClick = {() => {history.replace('/order')}}>
					<p>
						<Link to="/order">ORDER</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
