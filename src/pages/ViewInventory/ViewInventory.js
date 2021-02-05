import { Button, Card } from '@material-ui/core';
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
							<tr>
								{Array.from({ length: 12 }).map((_, index) => (
									<th key={index}>Table heading</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
							<tr>
								<td>2</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
							<tr>
								<td>3</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
							<tr>
								<td>1</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
							<tr>
								<td>2</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
							<tr>
								<td>3</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
							<tr>
								<td>1</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
							<tr>
								<td>2</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
							<tr>
								<td>3</td>
								{Array.from({ length: 12 }).map((_, index) => (
									<td key={index}>Table cell {index}</td>
								))}
							</tr>
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
