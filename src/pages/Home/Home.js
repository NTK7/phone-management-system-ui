import { set } from 'date-fns';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import './Home.css';
import commaNumber from 'comma-number';

function Home() {
	const history = useHistory();
	const [displayInventoryOptions, setDisplayInventoryOptions] = useState(false);
	const [totalProfit, setTotalProfit] = useState(0);
	const [totalSales, setTotalSales] = useState(0);
	const [loading, setLoading] = useState(true);
	const [displayOnTime, setDisplayOnTime] = useState(false);

	// Displaying the Total Profit and Total Sales
	useEffect(() => {
		let date = new Date();
		let startTime = 22 * 60;
		let endTime = 24 * 60;
		let currentTime = date.getHours() * 60 + date.getMinutes();

		if (currentTime >= startTime && currentTime <= endTime) {
			setDisplayOnTime(true);
		} else {
			setDisplayOnTime(false);
		}
	}, []);

	useEffect(() => {
		let profit = 0;
		let sales = 0;

		// Getting data from the Billing Collections
		db.collection('billing').onSnapshot((snapshot) => {
			for (let index = 0; index < snapshot.docs?.length; index++) {
				let date = snapshot.docs[index].data().date.toDate().toDateString();
				let todayDate = new Date().toDateString();

				//  Taking todays records only
				if (date === todayDate) {
					// setTotalSales(totalSales + snapshot.docs[index].data().TotalBill)
					profit = profit + snapshot.docs[index].data().TotalProfit;
					sales = sales + snapshot.docs[index].data().TotalBill;
				}
			}
			setTotalProfit(profit);
			setTotalSales(sales);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		console.log(totalProfit);
		console.log(totalSales);
	}, [totalProfit, totalSales]);

	return (
		<div className="home">
			<div className="home__nav">
				<h4>Phone Shop</h4>
			</div>
			{displayOnTime && (
				<div className="home__cardsTop">
					<Card className="home__cardsTopCard">
						<Card.Title>Total Profit for Today</Card.Title>
						{loading ? (
							<Card.Text>
								<h4>Loading...</h4>
							</Card.Text>
						) : (
							<Card.Text>
								<h4>Rs: {commaNumber(totalProfit)}</h4>
							</Card.Text>
						)}
					</Card>
					<Card className="home__cardsTopCard">
						<Card.Title>Total Sales for Today</Card.Title>
						{loading ? (
							<Card.Text>
								<h4>Loading...</h4>
							</Card.Text>
						) : (
							<Card.Text>
								<h4>Rs: {commaNumber(totalSales)}</h4>
							</Card.Text>
						)}
					</Card>
				</div>
			)}
			<div className="home__cards container">
				{/* <div className="lastPayments">
					<Card className="lastPayments__card">
						<Card.Text><h6>Last Payments</h6></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:45000</li></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:450</li></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:458990</li></Card.Text>
					</Card>
				</div> */}

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
				{/* <div className="itemEnds">
					<Card className="itemEnds__card">
						<Card.Title>Item ends</Card.Title>
						<Card.Text><li>itemName : 5 </li> </Card.Text>
						<Card.Text><li>itemName : 2 </li> </Card.Text>
						<Card.Text><li>itemName : 6 </li> </Card.Text>
					</Card>
				</div> */}
			</div>

			{/* Display for ipad mode */}
			{/* <div className="home__cardsIpad container">
				<div>
					<Card className="lastPayments__card">
						<Card.Text><h6>Last Payments</h6></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:45000</li></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:450</li></Card.Text>
						<Card.Text><li>01-02-2021 : Rs:458990</li></Card.Text>
					</Card>
				</div>

				<div>
					<Card className="itemEnds__card">
						<Card.Title>Item ends</Card.Title>
						<Card.Text><li>itemName : 5 </li> </Card.Text>
						<Card.Text><li>itemName : 2 </li> </Card.Text>
						<Card.Text><li>itemName : 6 </li> </Card.Text>
					</Card>
				</div>
			</div> */}
		</div>
	);
}

export default Home;
