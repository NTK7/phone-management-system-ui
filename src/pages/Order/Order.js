import { Button, Card } from '@material-ui/core';
import commaNumber from 'comma-number';
import { useEffect, useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addBillingData, addOrderData, selectBillingData, selectOrderData } from '../../features/OrderDataSlice';
import { db } from '../../firebase';
import { generateBill } from './DownloadBill';
import './Order.css';

function Order() {
	const [searchByBrand, setSearchByBrand] = useState(''); // user search by brand
	const [searchByItemCode, setSearchByItemCode] = useState(''); // user search by item code
	const [discount, setDiscount] = useState(0);
	const [totalSellingPrice, setTotalSellingPrice] = useState(0);
	const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);

	const [billingItems, setBillingItems] = useState([]); // Array of billing items
	const [totalSales, setTotalSales] = useState(0); // Total Sales Bill
	const [itemsData, setItemsData] = useState([]); // Stores all the phone items from the database

	const dispatch = useDispatch(); // dispatch
	const orderData = useSelector(selectOrderData); // order data
	const billingData = useSelector(selectBillingData); // billing data

	// This is used to fetch all the inventory data from the database
	useEffect(() => {
		// Fetching the data from the database
		db.collection('item').onSnapshot((snapshot) => {
			setItemsData(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
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

	// Adding to billing
	const addToBilling = ({
		brand,
		quantity,
		billingQuantity,
		originalPrice,
		code,
		model,
		sellingprice,
		vendor,
		date,
	}) => {
		if (quantity > 0) {
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
						quantity: element?.quantity,
						billingQuantity:
							parseInt(element?.billingQuantity) === parseInt(element?.quantity)
								? parseInt(element?.billingQuantity)
								: parseInt(element?.billingQuantity) + 1,
						sellingprice: element?.sellingprice,
						totalBill: !(parseInt(element?.billingQuantity) === parseInt(element?.quantity))
							? element.sellingprice * (parseInt(element.billingQuantity) + 1)
							: element.sellingprice * parseInt(element.billingQuantity),
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
						billingQuantity: billingQuantity,
						sellingprice: sellingprice,
						totalBill: sellingprice * billingQuantity,
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
		if (finalTotal !== 0) {
			// Updating the firebase database by adding the billing payment records into it.
			db.collection('billing')
				.add({
					date: new Date(),
					TotalProfit: profit,
					TotalBill: finalTotal,
				})
				.catch((err) => {
					console.log(err.message);
				});

			// Updating the items collection to update the remaining item present from what has been ordered from the user
			db.collection('item').onSnapshot((snapshot) => {
				for (let indexI = 0; indexI < billingItems.length; indexI++) {
					for (let indexJ = 0; indexJ < snapshot.docs.length; indexJ++) {
						let item = snapshot.docs[indexJ].data();

						if (billingItems[indexI].code === item.code) {
							db.collection('item')
								.doc(snapshot.docs[indexJ].id)
								.update({
									quantity: billingItems[indexI].quantity - billingItems[indexI].billingQuantity,
								});
						}
					}
				}
			});

			// downloading bill
			generateBill(billingItems, totalSales, discount, finalTotal);
		}
	};

	// Deleting Item from the Billing section
	const deleteBillingItem = (item) => {
		console.log(item);
		let myList = [];
		let removingIndex = null;
		// let myListOther = [];

		for (let index = 0; index < billingItems.length; index++) {
			if (billingItems[index].code === item.code) {
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
	const plusAdd = ({ brand, quantity, originalPrice, billingQuantity, code, model, sellingprice, vendor, date }) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const itemElement = myList[index];

			if (itemElement.brand === brand && itemElement.model === model) {
				myList[index] = {
					brand: itemElement?.brand,
					quantity: itemElement?.quantity,
					billingQuantity:
						parseInt(itemElement?.billingQuantity) === parseInt(itemElement?.quantity)
							? parseInt(itemElement?.billingQuantity)
							: parseInt(itemElement?.billingQuantity) + 1,
					sellingprice: parseInt(itemElement?.sellingprice),
					totalBill: !(parseInt(itemElement?.billingQuantity) === parseInt(itemElement?.quantity))
						? parseInt(itemElement?.sellingprice) * (parseInt(itemElement?.billingQuantity) + 1)
						: parseInt(itemElement?.sellingprice) * parseInt(itemElement?.billingQuantity),
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
	const minusRemove = ({
		brand,
		quantity,
		billingQuantity,
		originalPrice,
		code,
		model,
		sellingprice,
		vendor,
		date,
	}) => {
		let myList = [];
		for (let index = 0; index < billingItems.length; index++) {
			myList.push(billingItems[index]);
		}
		for (let index = 0; index < myList.length; index++) {
			const itemElement = myList[index];

			if (itemElement.brand === brand && itemElement.model === model) {
				myList[index] = {
					brand: itemElement?.brand,
					billingQuantity:
						parseInt(itemElement?.billingQuantity) !== 0 ? parseInt(itemElement?.billingQuantity) - 1 : 0,
					quantity: itemElement?.quantity,
					sellingprice: parseInt(itemElement?.sellingprice),
					totalBill:
						parseInt(itemElement?.billingQuantity) !== 0
							? parseInt(itemElement?.sellingprice) * (parseInt(itemElement?.billingQuantity) - 1)
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

				if (item?.code === searchByItemCode && item.quantity > 0) {
					console.log(billingItems[0]);
					console.log(item);
					setBillingItems([
						...billingItems,
						{
							brand: item?.brand,
							quantity: item?.quantity,
							billingQuantity: 1,
							sellingprice: item?.sellingprice,
							totalBill: item?.sellingprice * 1,
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
	const handleSearchOrder = (value) => {
		console.log(itemsData);
		let searchedDataRecords = [];
		if (value !== '') {
			// You are searching by brand
			for (let index = 0; index < itemsData?.length; index++) {
				const item = itemsData[index];

				if (item?.data.brand?.toLowerCase() === searchByBrand?.toLowerCase()) {
					searchedDataRecords.push({
						brand: item?.data.brand,
						model: item?.data.model,
						quantity: item?.data.quantity,
						billingQuantity: 1,
						originalPrice: item?.data.originalPrice,
						code: item?.data.code,
						date: item?.data.date,
						vendor: item?.data.vendor,
						sellingprice: item?.data.sellingprice,
					});
				}
				console.log(item?.data.brand?.toUpperCase());
			}
			dispatch(addOrderData(searchedDataRecords));
		} else {
			// display all the items
			for (let index = 0; index < itemsData?.length; index++) {
				const item = itemsData[index];
				searchedDataRecords.push({
					brand: item?.data.brand,
					model: item?.data.model,
					quantity: item?.data.quantity,
					billingQuantity: 1,
					originalPrice: item?.data.originalPrice,
					code: item?.data.code,
					date: item?.data.date,
					vendor: item?.data.vendor,
					sellingprice: item?.data.sellingprice,
				});
			}
			dispatch(addOrderData(searchedDataRecords));
		}
	};

	useEffect(() => {
		let searchedDataRecords = [];

		if (searchByBrand === '') {
			for (let index = 0; index < itemsData?.length; index++) {
				const item = itemsData[index];
				searchedDataRecords.push({
					brand: item?.data.brand,
					model: item?.data.model,
					quantity: item?.data.quantity,
					billingQuantity: 1,
					originalPrice: item?.data.originalPrice,
					code: item?.data.code,
					date: item?.data.date,
					vendor: item?.data.vendor,
					sellingprice: item?.data.sellingprice,
				});
			}
			dispatch(addOrderData(searchedDataRecords));
		}
	}, [searchByBrand, itemsData]);

	const customAlert = (message) => {
		return (
			<div
				class="modal fade"
				id="exampleModal"
				tabindex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">
								Success
							</h5>
							<button
								type="button"
								class="close"
								data-dismiss="modal"
								aria-label="Close"
								onClick={() => window.location.reload(true)}
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">{message}</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" onClick={() => window.location.reload(true)}>
								OK
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="order">
			{/* Alert Message */}
			{customAlert(
				'Payment Successfully Completed!'
			)}

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
								handleSearchOrder(searchByBrand);
							}
						}}
						value={searchByBrand}
					/>{' '}
					<Button
						onClick={(e) => {
							handleSearchOrder(searchByBrand);
						}}
					>
						Search
					</Button>
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
													<input
														className="quantityTextField"
														type="text"
														onChange={() => {}}
														value={item.billingQuantity}
													/>
													<button onClick={() => plusAdd(item)}>+</button>
												</td>
												<td>{item.sellingprice}</td>
												<td>{item.totalBill}</td>
												<td>
													<Button
														className="deleteBTN"
														onClick={() => deleteBillingItem(item)}
													>
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
													<input
														className="quantityTextField"
														type="text"
														onChange={() => {}}
														value={item.billingQuantity}
													/>
													<button onClick={() => plusAdd(item)}>+</button>
												</td>
												<td>{item.sellingprice}</td>
												<td>{item.totalBill}</td>
												<td>
													<Button
														className="deleteBTN"
														onClick={() => deleteBillingItem(item)}
													>
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
							<span>Total :</span>{' '}
							<input type="text" onChange={() => {}} value={commaNumber(totalSales)} />
						</ListGroup.Item>
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Discount :</span>{' '}
							<input type="text" onChange={(e) => handleDiscount(e.target.value)} value={discount} />
						</ListGroup.Item>
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Balance :</span>{' '}
							<input type="text" onChange={() => {}} value={commaNumber(totalSales - discount)} />
						</ListGroup.Item>
					</ListGroup>
					{/* Button */}
					<div className="payment__button">
						<Button onClick={handlePayment} data-toggle="modal" data-target="#exampleModal">
							Payment
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default Order;
