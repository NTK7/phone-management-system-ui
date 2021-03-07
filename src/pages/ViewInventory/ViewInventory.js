import { Button, Card } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectViewInventData, inventoryData } from '../../features/viewInventorySlice';
import './ViewInventory.css';

function ViewInventory() {
	const [searchVendorName, setSearchVendorName] = useState('');
	const [totalBill, setTotalBill] = useState(15000);
	const [initialPayment, setInitialPayment] = useState(7000);

	const dispatch = useDispatch();
	const viewInventData = useSelector(selectViewInventData);

	// Adding dummy data using redux initially
	useEffect(() => {
		// Creating dummy data
		// (FETCH THESE DATA FROM THE DATABASE)
		let dummyData = [];
		for (let index = 0; index < 10; index++) {
			dummyData.push({
				brand: 'Dummy Brand',
				model: 'Dummy Model',
				vendor: 'Dummy Vendor',
				quantity: 'Dummy Quantity',
				myPayment: 'Dummy my payment',
				payDate: 'Dummy pay date',
				purDate: 'Dummy Pur date',
				total: 'Dummy total',
			});
		}

		dispatch(inventoryData(dummyData));
	}, []);

	//  SEARCH VENDOR BY NAME
	const searchVendor = () => {
		alert(searchVendorName);

		// clear the text field once searching is done
		setSearchVendorName('');
	};

	const payBalance = () => {
		alert('Paying balance');
	};

	const handleOnClickRow = (input) => {
		setInitialPayment(input?.initialPay);
		setTotalBill(input?.totalB);
	};

	return (
		<div className="viewInventory">
			{/* search by vendor */}
			<div className="viewInventory__top">
				{/* input and search button to search for the vender */}
				<div className="viewInventory__topTableAndSearchSection">
					<div className="viewInventory__topInput">
						<input
							type="text"
							placeholder="Search by vendor"
							onChange={(e) => setSearchVendorName(e.target.value)}
							value={searchVendorName}
						/>{' '}
						<Button onClick={searchVendor}>Search</Button>
					</div>
					<div className="viewInventory__topTableHeading">
						<Table responsive striped bordered hover variant="dark">
							<thead>
								{/* Headings of the table */}
								<tr>
									<th>BRAND</th>
									<th>MODEL</th>
									<th>VENDOR</th>
									<th>QUANTITY</th>
									<th>MY PAYMENT</th>
									<th>PAY DATE</th>
									<th>PUR DATE</th>
									<th>TOTAL</th>
								</tr>
							</thead>
						</Table>
					</div>
				</div>
				<div className="viewInventory__topTableBody">
					<Table responsive striped bordered hover variant="dark">
						<tbody>
							{/* Creating dummy data with 20 rows */}

							{viewInventData.map((item, index) => (
								<>
									{(index%2 === 0) ? (
										<tr
											className="rowOdd"
											onClick={() =>
												handleOnClickRow({
													totalB: 2500,
													initialPay: 1200,
												})
											}
										>
											<td>{item?.brand}</td>
											<td>{item?.model}</td>
											<td>{item?.vendor}</td>
											<td>{item?.quantity}</td>
											<td>{item?.myPayment}</td>
											<td>{item?.payDate}</td>
											<td>{item?.purDate}</td>
											<td>{item?.total}</td>
										</tr>
									) : (
										<tr
											className="rowEven"
											onClick={() =>
												handleOnClickRow({
													totalB: 5000,
													initialPay: 1600,
												})
											}
										>
											<td>{item?.brand}</td>
											<td>{item?.model}</td>
											<td>{item?.vendor}</td>
											<td>{item?.quantity}</td>
											<td>{item?.myPayment}</td>
											<td>{item?.payDate}</td>
											<td>{item?.purDate}</td>
											<td>{item?.total}</td>
										</tr>
									)}
								</>
							))}
						</tbody>
					</Table>
				</div>
			</div>

			{/* total bill section */}
			<div className="viewInventory__bottom">
				<Card className="viewInventory__bottomCard">
					<ListGroup variant="flush" className="viewInventory__bottomCardListGroup">
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Total Bill :</span> <input type="text" value={totalBill} />
						</ListGroup.Item>
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Initial Payment: </span>
							<input type="text" value={initialPayment} />
						</ListGroup.Item>
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>Balance:</span> <input type="text" value={totalBill - initialPayment} />
						</ListGroup.Item>
					</ListGroup>
					<div className="payBalance__button">
						<Button onClick={payBalance}>Pay Balance</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default ViewInventory;
