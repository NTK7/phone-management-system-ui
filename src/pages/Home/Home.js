import './Home.css';

function Home() {
	return (
		<div className="home">
			{/* nav bar for home */}
			<div className="home__nav">
				<h4>Phone Shop</h4>
			</div>
			{/* cards */}
			<div className="home__cards container">
				{/* inventory card */}
				<div className="home__cardsInventory">
					<p>INVENTORY</p>
				</div>

				{/* order card */}
				<div className="home__cardsOrder">
					<p>ORDER</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
