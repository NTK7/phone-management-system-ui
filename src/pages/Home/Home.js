import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
	const [displayInventoryOptions, setDisplayInventoryOptions] = useState(false);
	return (
		<div className="home">
			{/* nav bar for home */}
			<div className="home__nav">
				<h4>Phone Shop</h4>
			</div>
			{/* cards */}
			<div className="home__cards container">
				{/* inventory card */}
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

				{/* order card */}
				<div className="home__cardsOrder">
					<p>
						<Link to="/order">ORDER</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
