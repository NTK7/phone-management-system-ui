import { Button, Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addBillingData, addOrderData, selectBillingData, selectOrderData } from '../../features/OrderDataSlice';
import './Order.css';

function Order() {
	const [searchByBrand, setSearchByBrand] = useState('');
	const [searchByBrandModel, setSearchByBrandModel] = useState('');

	const dispatch = useDispatch();
	const orderData = useSelector(selectOrderData);
	const billingData = useSelector(selectBillingData);

	const searchByBrandFunction = () => {
		alert(searchByBrand);
	};

	const searchByBrandAndModelFunction = () => {
		alert(searchByBrandModel);
	};

	useEffect(() => {
		// Creating dummy data (ORDER DATA)
		// (FETCH THESE DATA FROM THE DATABASE)
		let dummyData = [];
		for (let index = 0; index < 5; index++) {
			dummyData.push({
				brand: 'Dummy Brand',
				model: 'Dummy Model',
				quantity: 'Dummy Quantity',
				originalPrice: 'Dummy originalPrice',
			});
		}
		dispatch(addOrderData(dummyData));

		// Creating dummy data (BILLING DATA)
		// (FETCH THESE DATA FROM THE DATABASE)
		dummyData = [];
		for (let index = 0; index < 5; index++) {
			dummyData.push({
				item: 'Dummy item',
				quantity: 'Dummy quantity',
				sellingPrice: 'Dummy sellingPrice',
				totalBill: 'Dummy totalBill',
			});
		}
		dispatch(addBillingData(dummyData));
	}, []);

	return (
		<div className="order">
			{/* Search by brand section */}
			<br />
			<div className="order__searchByBrand">
				<input
					type="text"
					placeholder="Search by brand"
					onChange={(e) => setSearchByBrand(e.target.value)}
					value={searchByBrand}
				/>{' '}
				<Button onClick={searchByBrandFunction}>Search</Button>
			</div>

			{/* table section */}
			<div className="order__table">
				<div className="order__topTableHeading">
					<Table responsive striped bordered hover variant="dark">
						<thead className="order__topTableHeadingThreadHeader">
							{/* Headings of the table */}
							<tr>
								<th>BRAND</th>
								<th>MODEL</th>
								<th>QUANTITY</th>
								<th>ORIGINAL PRICE</th>
							</tr>
						</thead>
					</Table>
				</div>
				<div className="order__topTableBody">
					<Table responsive striped bordered hover variant="dark">
						<tbody className="order__topTableHeadingThreadBody">
							{/* Creating dummy data with 20 rows */}
							{orderData.map((item, index) => (
								<>
									{index % 2 === 0 ? (
										<tr className="rowOdd">
											<td>{item?.brand}</td>
											<td>{item?.model}</td>
											<td>{item?.quantity}</td>
											<td>{item?.originalPrice}</td>
										</tr>
									) : (
										<tr className="rowEven">
											<td>{item?.brand}</td>
											<td>{item?.model}</td>
											<td>{item?.quantity}</td>
											<td>{item?.originalPrice}</td>
										</tr>
									)}
								</>
							))}
						</tbody>
					</Table>
				</div>
			</div>

			{/* Billing Section */}
			<div className="order__billing">
				<h2>Billing</h2>
				<div className="order__searchByBrandModel">
					<input
						type="text"
						placeholder="Search by brand or model"
						onChange={(e) => setSearchByBrandModel(e.target.value)}
						value={setSearchByBrandModel}
					/>{' '}
					<Button onClick={searchByBrandAndModelFunction}>Search</Button>
				</div>

				{/* table section */}
				<div className="order__table">
					<div className="order__topTableHeading">
						<Table responsive striped bordered hover variant="dark">
							<thead>
								{/* Headings of the table */}
								<tr>
									<th>ITEM</th>
									<th>QUANTITY</th>
									<th>SELLING PRICE</th>
									<th>TOTAL BILL</th>
								</tr>
							</thead>
						</Table>
					</div>
					<div className="order__topTableBody">
						<Table responsive striped bordered hover variant="dark">
							<tbody>
								{/* Creating dummy data with 20 rows */}
								{billingData.map((item, index) => (
									<>
										{index % 2 === 0 ? (
											<tr className="rowOdd">
												<td>{item.item}</td>
												<td>
													<input type="text" placeholder={item.quantity} />
												</td>
												<td>
													<input type="text" placeholder={item.sellingPrice} />
												</td>
												<td>{item.totalBill}</td>
											</tr>
										) : (
											<tr className="rowEven">
												<td>{item.item}</td>
												<td>
													<input type="text" placeholder={item.quantity} />
												</td>
												<td>
													<input type="text" placeholder={item.sellingPrice} />
												</td>
												<td>{item.totalBill}</td>
											</tr>
										)}
									</>
								))}
							</tbody>
						</Table>
					</div>
				</div>
			</div>
			{/* Total Section */}
			<div className="order__total">
				<Card className="viewInventory__bottomCard">
					<ListGroup variant="flush" className="order__bottomCardListGroup">
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Total Sale :</span> <input type="text" value={0} />
						</ListGroup.Item>
						{/* Button */}
						<div className="payment__button">
							<Button>Payment</Button>
						</div>
					</ListGroup>
				</Card>
			</div>
		</div>
	);
}

export default Order;
