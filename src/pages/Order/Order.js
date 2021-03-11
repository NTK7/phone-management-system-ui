import { Button, Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addBillingData, addOrderData, selectBillingData, selectOrderData } from '../../features/OrderDataSlice';
import './Order.css';

function Order() {
	const [searchByBrand, setSearchByBrand] = useState('');
	const [searchByBrandModel, setSearchByBrandModel] = useState('');
	const [billingItems, setBillingItems] = useState([]);
	const [totalSales, setTotalSales] = useState(0);

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
				brand: `Dummy Brand ${index}`,
				model: 'Dummy Model',
				quantity: 1,
				originalPrice: 20,
			});
		}
		dispatch(addOrderData(dummyData));

		// Creating dummy data (BILLING DATA)
		// (FETCH THESE DATA FROM THE DATABASE)
		// dummyData = [];
		// for (let index = 0; index < 5; index++) {
		// dummyData.push({
		// 	item: 'Dummy item',
		// 	quantity: 'Dummy quantity',
		// 	sellingPrice: 'Dummy sellingPrice',
		// 	totalBill: 'Dummy totalBill',
		// });
		// }
		// dispatch(addBillingData(dummyData));
	}, []);

	useEffect(() => {
		// update the billing data items
		dispatch(addBillingData(billingItems));

		// updating the total sales
		let sum = [];
		for (let index = 0; index < billingItems.length; index++) {
			const element = billingItems[index];
			sum.push(element?.totalBill);
		}
		setTotalSales(sum.reduce((a, b) => a + b, 0));
	}, [billingItems]);

	const addToBilling = ({ brand, model, quantity, originalPrice }) => {
		setBillingItems([
			...billingItems,
			{
				item: brand,
				quantity: quantity,
				sellingPrice: originalPrice,
				totalBill: originalPrice * quantity,
			},
		]);
	};

	const updatingBillingItemQuantity = (itemName, e) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const element = myList[index];

			if (element.item === itemName) {
				myList[index] = {
					item: itemName,
					quantity: e.target.value,
					sellingPrice: myList[index].sellingPrice,
					totalBill: myList[index].sellingPrice * e.target.value,
				};
			}
		}
		setBillingItems(myList);
	};

	const updatingBillingItemSellingPrice = (itemName, e) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const element = myList[index];

			if (element.item === itemName) {
				myList[index] = {
					item: itemName,
					quantity: myList[index].quantity,
					sellingPrice: e.target.value,
					totalBill: e.target.value * myList[index].quantity,
				};
			}
		}
		setBillingItems(myList);
	};

	const deleteBillingItem = (item) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}

		myList.pop(item);

		setBillingItems(myList);
	};

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
										<tr className="rowOdd" onClick={() => addToBilling(item)}>
											<td>{item?.brand}</td>
											<td>{item?.model}</td>
											<td>{item?.quantity}</td>
											<td>{item?.originalPrice}</td>
										</tr>
									) : (
										<tr className="rowEven" onClick={() => addToBilling(item)}>
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
									<th>DELETE</th>
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
													<input
														type="number"
														defaultValue={item.quantity}
														onChange={(e) => {
															updatingBillingItemQuantity(item?.item, e);
														}}
													/>
												</td>
												<td>
													<input
														type="number"
														defaultValue={item.sellingPrice}
														onChange={(e) => {
															updatingBillingItemSellingPrice(item?.item, e);
														}}
													/>
												</td>
												<td>{item.totalBill}</td>
												<td>
													<Button className="deleteBTN" onClick={() => deleteBillingItem(item)}>
														DELETE
													</Button>
												</td>
											</tr>
										) : (
											<tr className="rowEven">
												<td>{item.item}</td>
												<td>
													<input
														type="number"
														defaultValue={item.quantity}
														onChange={(e) => {
															updatingBillingItemQuantity(item?.item, e);
														}}
													/>
												</td>
												<td>
													<input
														type="number"
														defaultValue={item.sellingPrice}
														onChange={(e) => {
															updatingBillingItemSellingPrice(item?.item, e);
														}}
													/>
												</td>
												<td>{item.totalBill}</td>
												<td>
													<Button className="deleteBTN" onClick={() => deleteBillingItem(item)}>
														DELETE
													</Button>
												</td>
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
							<span>Total Sale :</span> <input type="text" value={totalSales} />
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
