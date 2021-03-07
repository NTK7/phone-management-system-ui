import { useState } from 'react';
import { Card } from 'react-bootstrap';
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
			<div className="home__cardsTop">
				<Card className="home__cardsTopCard">
					<Card.Title>Day 01</Card.Title>
					<Card.Text>Profit</Card.Text>
					<Card.Text>100000</Card.Text>
				</Card>
				<Card className="home__cardsTopCard">
					<Card.Title>Day 02</Card.Title>
					<Card.Text>Profit</Card.Text>
					<Card.Text>100000</Card.Text>
				</Card>
				<Card className="home__cardsTopCard">
					<Card.Title>Day 03</Card.Title>
					<Card.Text>Profit</Card.Text>
					<Card.Text>100000</Card.Text>
				</Card>
				<Card className="home__cardsTopCard">
					<Card.Title>Day 04</Card.Title>
					<Card.Text>Profit</Card.Text>
					<Card.Text>100000</Card.Text>
				</Card>
				<Card className="home__cardsTopCard">
					<Card.Title>Day 05</Card.Title>
					<Card.Text>Profit</Card.Text>
					<Card.Text>100000</Card.Text>
				</Card>
				<Card className="home__cardsTopCard">
					<Card.Title>Day 06</Card.Title>
					<Card.Text>Profit</Card.Text>
					<Card.Text>100000</Card.Text>
				</Card>
				<Card className="home__cardsTopCard">
					<Card.Title>Day 07</Card.Title>
					<Card.Text>Profit</Card.Text>
					<Card.Text>100000</Card.Text>
				</Card>
			</div>
			<div className="home__cards container">
					{/* last payments section */}
					<div className="lastPayments">
						<Card>
							<Card.Title>Last Payments</Card.Title>
						</Card>
					</div>

					{/* main menu container */}
					<div className="mainMenuContainer">
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

						<div
							className="home__cardsOrder"
							onClick={() => {
								history.replace('/order');
							}}
						>
							<p>
								<Link to="/order">ORDER</Link>
							</p>
						</div>
					</div>
					{/* items ends section */}
					<div className="itemEnds">
						<Card>
							<Card.Title>Last Payments</Card.Title>
						</Card>
					</div>
			</div>
		</div>
	);
}

export default Home;
