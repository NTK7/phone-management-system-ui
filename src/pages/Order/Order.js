import { Button, Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addBillingData, addOrderData, selectBillingData, selectOrderData } from '../../features/OrderDataSlice';
import { db } from '../../firebase';
import './Order.css';

function Order() {
	const [searchByBrand, setSearchByBrand] = useState('');
	const [searchByBrandModel, setSearchByBrandModel] = useState('');
	const [billingItems, setBillingItems] = useState([]);
	const [orderItems, setOrderItems] = useState([]);
	const [totalSales, setTotalSales] = useState(0);
	const [inventoryData, setInventoryData] = useState([]);

	const dispatch = useDispatch();
	const orderData = useSelector(selectOrderData);
	const billingData = useSelector(selectBillingData);

	// This is used to fetch all the inventory data from the database
	useEffect(() => {
		// Fetching the data from the database
		db.collection('item').onSnapshot((snapshot) =>
			setInventoryData(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	// This is used to update the Total Sales amount when the used changes the billing section
	useEffect(() => {
		// update the billing data items
		dispatch(addBillingData(billingItems));

		// updating the total sales
		let sum = [];
		for (let index = 0; index < billingItems.length; index++) {
			const element = billingItems[index];
			sum.push(parseInt(element?.totalBill));
		}
		setTotalSales(sum.reduce((a, b) => a + b, 0));
	}, [billingItems]);

	// Adding to billing
	const addToBilling = ({ brand, model, quantity, originalPrice }) => {
		let myList = [];
		let found = false;
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const element = myList[index];

			if (element.item === brand) {
				found = true;
				myList[index] = {
					item: brand,
					quantity: parseInt(myList[index].quantity) + 1,
					sellingPrice: myList[index].sellingPrice,
					totalBill: myList[index].sellingPrice * (parseInt(myList[index].quantity) + 1),
				};
			}
		}

		if (found === false) {
			setBillingItems([
				...billingItems,
				{
					item: brand,
					quantity: quantity,
					sellingPrice: originalPrice,
					totalBill: originalPrice * quantity,
				},
			]);
		} else {
			setBillingItems(myList);
		}
	};

	// Deleting Item from the Billing section
	const deleteBillingItem = (item) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}

		myList.pop(item);

		setBillingItems(myList);
	};

	// Increase Quantity Method
	const plusAdd = (itemName) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const element = myList[index];

			if (element.item === itemName) {
				myList[index] = {
					item: itemName,
					quantity: parseInt(myList[index].quantity) + 1,
					sellingPrice: parseInt(myList[index].sellingPrice),
					totalBill: parseInt(myList[index].sellingPrice) * (parseInt(myList[index].quantity) + 1),
				};
			}
		}
		setBillingItems(myList);
	};

	// Remove quantity method
	const minusRemove = (itemName) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const element = myList[index];

			if (element.item === itemName) {
				myList[index] = {
					item: itemName,
					quantity: parseInt(myList[index].quantity) - 1,
					sellingPrice: parseInt(myList[index].sellingPrice),
					totalBill: parseInt(myList[index].sellingPrice) * (parseInt(myList[index].quantity) - 1),
				};
			}
		}
		setBillingItems(myList);
	};

	// Handling search section in billing
	const handleSearchBilling = () => {
		alert(searchByBrandModel);
	};

	// Handling search section in order
	const handleSearchOrder = () => {
		console.log(inventoryData);
		let searchedDataRecords = [];
		for (let index = 0; index < inventoryData?.length; index++) {
			const item = inventoryData[index];

			if (item?.data.brand.toLowerCase() === searchByBrand.toLowerCase()) {
				searchedDataRecords.push({
					brand: item?.data.brand,
					model: item?.data.model,
					quantity: item?.data.quantity,
					originalPrice: item?.data.originalPrice,
				});
			}
			console.log(item.data.brand.toUpperCase());
		}

		dispatch(addOrderData(searchedDataRecords));
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
				<Button onClick={handleSearchOrder}>Search</Button>
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
						value={searchByBrandModel}
					/>{' '}
					<Button onClick={handleSearchBilling}>Search</Button>
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
													<button onClick={() => minusRemove(item.item)}>-</button>
													<input className="quantityTextField" type="text" value={item.quantity} />
													<button onClick={() => plusAdd(item.item)}>+</button>
												</td>
												<td>
													<p>{item.sellingPrice}</p>

													{/* <input type="text" className="quantityTextField" value={item.sellingPrice} /> */}
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
													<button onClick={() => minusRemove(item.item)}>-</button>
													<input className="quantityTextField" type="text" value={item.quantity} />
													<button onClick={() => plusAdd(item.item)}>+</button>
												</td>
												<td>
													<p>{item.sellingPrice}</p>
													{/* <input type="text" value={item.sellingPrice} /> */}
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

// TRASH CODE BUT CAN BE RE-USED IF NECESSARY ----------------------------------------------

// useEffect(() => {
// 	// Creating dummy data (ORDER DATA)
// 	// (FETCH THESE DATA FROM THE DATABASE)
// 	let dummyData = [];
// 	for (let index = 0; index < 5; index++) {
// 		dummyData.push({
// 			brand: `Dummy Brand ${index}`,
// 			model: 'Dummy Model',
// 			quantity: 1,
// 			originalPrice: 20,
// 		});
// 	}
// 	dispatch(addOrderData([]));
// 	// Creating dummy data (BILLING DATA) [THIS IS NOT USED AND CAN BE REMOVED LATELY]
// 	// (FETCH THESE DATA FROM THE DATABASE)
// 	dummyData = [];
// 	for (let index = 0; index < 5; index++) {
// 	dummyData.push({
// 		item: 'Dummy item',
// 		quantity: 'Dummy quantity',
// 		sellingPrice: 'Dummy sellingPrice',
// 		totalBill: 'Dummy totalBill',
// 	});
// 	}
// 	dispatch(addBillingData(dummyData));
// }, []);
