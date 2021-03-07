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
					<Card className="lastPayments__card">
						<Card.Text><h6>Last Payments</h6></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:45000</li></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:450</li></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:458990</li></Card.Text>
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
					<Card className="itemEnds__card">
						<Card.Title>Item ends</Card.Title>
						<Card.Text><li>itemName : 5 </li> </Card.Text>
						<Card.Text><li>itemName : 2 </li> </Card.Text>
						<Card.Text><li>itemName : 6 </li> </Card.Text>
					</Card>
				</div>
			</div>

			{/* Display for ipad mode */}
			<div className="home__cardsIpad container">
				{/* last payments section */}
				<div>
					<Card className="lastPayments__card">
						<Card.Text><h6>Last Payments</h6></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:45000</li></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:450</li></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:458990</li></Card.Text>
					</Card>
				</div>

				{/* items ends section */}
				<div>
					<Card className="itemEnds__card">
						<Card.Title>Item ends</Card.Title>
						<Card.Text><li>itemName : 5 </li> </Card.Text>
						<Card.Text><li>itemName : 2 </li> </Card.Text>
						<Card.Text><li>itemName : 6 </li> </Card.Text>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default Home;
