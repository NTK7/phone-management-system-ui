import { Button, Card } from '@material-ui/core';
import { ViewArraySharp } from '@material-ui/icons';
import { useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import './ViewInventory.css';

function ViewInventory() {
	const [searchVendorName, setSearchVendorName] = useState('');
	const [totalBill, setTotalBill] = useState('15,000');
	const [initialPayment, setInitialPayment] = useState('7,000');
	const [balance, setBalance] = useState('8,000');

	//  SEARCH VENDOR BY NAME
	const searchVendor = () => {
		alert(searchVendorName);

		// clear the text field once searching is done
		setSearchVendorName('');
	};

	return (
		<div className="viewInventory">
			{/* search by vendor */}
			<div className="viewInventory__top">
				{/* input and search button to search for the vender */}
				<div className="viewInventory__topInput">
					<input
						type="text"
						placeholder="Search by vendor"
						onChange={(e) => setSearchVendorName(e.target.value)}
						value={searchVendorName}
					/>{' '}
					<Button onClick={searchVendor}>Search</Button>
				</div>
				<div className="viewInventory__topTable">
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
						<tbody>
							{/* Creating dummy data with 20 rows */}
							{Array.from({ length: 20 }).map((_) => (
								<tr>
									<td>Brand Data</td>
									<td>Model Data</td>
									<td>Vendor Data</td>
									<td>Quantity Data</td>
									<td>My Payment Data</td>
									<td>Pay Date Data</td>
									<td>Pur Date Data</td>
									<td>Total Data</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>

			{/* total bill section */}
			<div className="viewInventory__bottom">
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>Total Bill : {totalBill}</ListGroup.Item>
						<ListGroup.Item>Initial Payment: {initialPayment}</ListGroup.Item>
						<ListGroup.Item>Balance: {balance}</ListGroup.Item>
					</ListGroup>
				</Card>
			</div>
		</div>
	);
}

export default ViewInventory;
