import { Button, Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addBillingData, addOrderData, selectBillingData, selectOrderData } from '../../features/OrderDataSlice';
import { db } from '../../firebase';
import './Order.css';

function Order() {
	const [searchByBrand, setSearchByBrand] = useState(''); // user search by brand
	const [searchByItemCode, setSearchByItemCode] = useState(''); // user search by item code
	const [discount, setDiscount] = useState(0);
	const [totalSellingPrice, setTotalSellingPrice] = useState(0);
	const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);

	const [billingItems, setBillingItems] = useState([]); // Array of billing items
	// const [searchedItemsBilling, setSearchedItemsBilling] = useState(null); // Array of searched items

	// This decides whether the bill items or the searched items to be added into the main billing data
	// const [validSearchBillItems, setValidSearchBillItems] = useState(false);

	const [totalSales, setTotalSales] = useState(0); // Total Sales Bill
	const [itemsData, setItemsData] = useState([]); // Stores all the phone items from the database

	const dispatch = useDispatch(); // dispatch
	const orderData = useSelector(selectOrderData); // order data
	const billingData = useSelector(selectBillingData); // billing data

	// This is used to fetch all the inventory data from the database
	useEffect(() => {
		// Emptying the order content
		dispatch(addOrderData([]));

		// Fetching the data from the database
		db.collection('item').onSnapshot((snapshot) =>
			setItemsData(
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
		let totalSalesSum = [];
		let totalSellingPriceSum = [];
		let totalOriginalPriceSum = [];

		for (let index = 0; index < billingItems.length; index++) {
			const element = billingItems[index];
			console.log(element);
			totalSalesSum.push(parseInt(element?.totalBill));
			totalSellingPriceSum.push(parseInt(element?.sellingprice));
			totalOriginalPriceSum.push(parseInt(element?.originalPrice));
		}

		setTotalSellingPrice(totalSellingPriceSum.reduce((a, b) => a + b, 0));
		setTotalOriginalPrice(totalOriginalPriceSum.reduce((a, b) => a + b, 0));
		setTotalSales(totalSalesSum.reduce((a, b) => a + b, 0));
	}, [billingItems]);

	// Searching Items from the billing section
	// useEffect(() => {
	// 	if (searchedItemsBilling !== null && validSearchBillItems === true) {
	// 		// update the billing data items
	// 		dispatch(addBillingData(searchedItemsBilling));
	// 		setValidSearchBillItems(false);
	// 	}
	// }, [searchedItemsBilling]);

	// Adding to billing
	const addToBilling = ({ brand, quantity, originalPrice, code, model, sellingprice, vendor, date }) => {
		let myList = [];
		let found = false;
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const element = myList[index];

			if (element.brand === brand && element.model === model) {
				found = true;
				myList[index] = {
					brand: element?.brand,
					quantity: parseInt(element.quantity) + 1,
					sellingprice: element.sellingprice,
					totalBill: element.sellingprice * (parseInt(element.quantity) + 1),
					code: element?.code,
					model: element?.model,
					originalPrice: element?.originalPrice,
					vendor: element?.vendor,
					date: element?.date,
				};
			}
		}

		if (found === false) {
			setBillingItems([
				...billingItems,
				{
					brand: brand,
					quantity: quantity,
					sellingprice: sellingprice,
					totalBill: sellingprice * quantity,
					code: code,
					model: model,
					originalPrice: originalPrice,
					vendor: vendor,
					date: date,
				},
			]);
		} else {
			setBillingItems(myList);
		}
	};

	// Handling Discount
	const handleDiscount = (value) => {
		if (!isNaN(value)) {
			// Converting if the user entered a negative number into a positive number
			value = Math.abs(value);

			// This is a valid integer entered by the user
			if (value >= totalSales) {
				setDiscount(totalSales);
			} else {
				setDiscount(value);
			}
		}
	};

	// Handling Payment Amount
	const handlePayment = () => {
		let finalTotal = totalSales - discount;
		let profit = totalSellingPrice - totalOriginalPrice - discount;
		if(finalTotal !== 0){

		// Updating the firebase database by adding the billing payment records into it.
		db.collection('billing').add({
			date: new Date(),
			TotalProfit: profit,
			TotalBill: finalTotal,
		});
		}

	};

	// Deleting Item from the Billing section
	const deleteBillingItem = (item) => {
		let myList = [];
		let removingIndex = null;
		// let myListOther = [];

		for (let index = 0; index < billingItems.length; index++) {
			if (billingItems[index].brand === item.brand) {
				removingIndex = index;
				console.log('removing');
			}
			myList.push(billingItems[index]);
		}
		console.log(myList);

		if (removingIndex !== null) {
			myList.splice(removingIndex, 1);
		}

		console.log(myList);
		setBillingItems(myList);
		setSearchByItemCode('');
	};

	// Increase Quantity Method
	const plusAdd = ({ brand, quantity, originalPrice, code, model, sellingprice, vendor, date }) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const itemElement = myList[index];

			if (itemElement.brand === brand && itemElement.model === model) {
				myList[index] = {
					brand: brand,
					quantity: parseInt(itemElement?.quantity) + 1,
					sellingprice: parseInt(itemElement?.sellingprice),
					totalBill: parseInt(itemElement?.sellingprice) * (parseInt(itemElement?.quantity) + 1),
					code: itemElement?.code,
					model: itemElement?.model,
					originalPrice: itemElement?.originalPrice,
					vendor: itemElement?.vendor,
					date: itemElement?.date,
				};
			}
		}
		setBillingItems(myList);
		setSearchByItemCode('');
	};

	// Remove quantity method
	const minusRemove = ({ brand, quantity, originalPrice, code, model, sellingprice, vendor, date }) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const itemElement = myList[index];

			if (itemElement.brand === brand && itemElement.model === model) {
				myList[index] = {
					brand: brand,
					quantity: parseInt(itemElement.quantity) !== 0 ? parseInt(itemElement.quantity) - 1 : 0,
					sellingprice: parseInt(itemElement.sellingprice),
					totalBill:
						parseInt(itemElement.quantity) !== 0
							? parseInt(itemElement.sellingprice) * (parseInt(itemElement.quantity) - 1)
							: 0,
					code: itemElement?.code,
					model: itemElement?.model,
					originalPrice: itemElement?.originalPrice,
					vendor: itemElement?.vendor,
					date: itemElement?.date,
				};
			}
		}
		setBillingItems(myList);
		setSearchByItemCode('');
	};

	// Handling search section in billing
	const handleSearchBilling = () => {
		let isPresent = false;

		for (let index = 0; index < billingItems.length; index++) {
			const element = billingItems[index];

			if (element.code === searchByItemCode) {
				plusAdd(element);
				isPresent = true;
			}
		}

		if (!isPresent) {
			// checking if there is an item with the entered code in the code
			for (let index = 0; index < itemsData?.length; index++) {
				const item = itemsData[index].data;

				if (item?.code === searchByItemCode) {
					console.log(billingItems[0]);
					console.log(item);
					setBillingItems([
						...billingItems,
						{
							brand: item?.brand,
							quantity: item?.quantity,
							sellingprice: item?.sellingprice,
							totalBill: item?.sellingprice * item?.quantity,
							code: item?.code,
							model: item?.model,
							originalPrice: item?.originalPrice,
							vendor: item?.vendor,
							date: item?.date,
						},
					]);
				}
			}
		}

		console.log(billingItems);
		setSearchByItemCode('');
	};

	// Handling search section in order
	const handleSearchOrder = () => {
		console.log(itemsData);
		let searchedDataRecords = [];
		for (let index = 0; index < itemsData?.length; index++) {
			const item = itemsData[index];

			if (item?.data.brand.toLowerCase() === searchByBrand.toLowerCase()) {
				searchedDataRecords.push({
					brand: item?.data.brand,
					model: item?.data.model,
					quantity: item?.data.quantity,
					originalPrice: item?.data.originalPrice,
					code: item?.data.code,
					date: item?.data.date,
					vendor: item?.data.vendor,
					sellingprice: item?.data.sellingprice,
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

			{/* Form is used because when you click enter this will trigger the method handleSearchOrder to run */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSearchOrder();
				}}
			>
				<div className="order__searchByBrand">
					<input
						type="text"
						placeholder="Search by brand"
						onChange={(e) => {
							e.preventDefault();
							setSearchByBrand(e.target.value);

							// If the search field is empty then order seciton also empty
							if (e.target.value === '') {
								handleSearchOrder();
							}
						}}
						value={searchByBrand}
					/>{' '}
					<Button onClick={handleSearchOrder}>Search</Button>
				</div>
			</form>
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
										<tr key={index} className="rowOdd" onClick={() => addToBilling(item)}>
											<td>{item?.brand}</td>
											<td>{item?.model}</td>
											<td>{item?.quantity}</td>
											<td>{item?.originalPrice}</td>
										</tr>
									) : (
										<tr key={index} className="rowEven" onClick={() => addToBilling(item)}>
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
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSearchBilling();
					}}
				>
					<div className="order__searchByBrandModel">
						<input
							type="text"
							placeholder="Search by Item code"
							onChange={(e) => {
								setSearchByItemCode(e.target.value);

								if (e.target.value === '') {
									// handleSearchBilling();
									// resetting the billing items will all the selected items
									dispatch(addBillingData(billingItems));
								}
							}}
							value={searchByItemCode}
						/>{' '}
						<Button onClick={handleSearchBilling}>Search</Button>
					</div>
				</form>
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
											<tr key={index} className="rowOdd">
												<td>
													{item.brand} {item.model}
												</td>
												<td>
													<button onClick={() => minusRemove(item)}>-</button>
													<input className="quantityTextField" type="text" onChange={() => {}} value={item.quantity} />
													<button onClick={() => plusAdd(item)}>+</button>
												</td>
												<td>{item.sellingprice}</td>
												<td>{item.totalBill}</td>
												<td>
													<Button className="deleteBTN" onClick={() => deleteBillingItem(item)}>
														DELETE
													</Button>
												</td>
											</tr>
										) : (
											<tr key={index} className="rowEven">
												<td>
													{item.brand} {item.model}
												</td>
												<td>
													<button onClick={() => minusRemove(item)}>-</button>
													<input className="quantityTextField" type="text" onChange={() => {}} value={item.quantity} />
													<button onClick={() => plusAdd(item)}>+</button>
												</td>
												<td>{item.sellingprice}</td>
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
				<Card className="viewInventory__bottomCard order__totalCard">
					<ListGroup variant="flush" className="order__bottomCardListGroup">
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Total :</span> <input type="text" onChange={() => {}} value={totalSales} />
						</ListGroup.Item>
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Discount :</span>{' '}
							<input type="text" onChange={(e) => handleDiscount(e.target.value)} value={discount} />
						</ListGroup.Item>
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Balance :</span> <input type="text" onChange={() => {}} value={totalSales - discount} />
						</ListGroup.Item>
					</ListGroup>
					{/* Button */}
					<div className="payment__button">
						<Button onClick={handlePayment}>Payment</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default Order;