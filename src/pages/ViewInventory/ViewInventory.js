import { Button, Card } from '@material-ui/core';
import { useRef, useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import './ViewInventory.css';

function ViewInventory() {
	const [searchVendorName, setSearchVendorName] = useState('');
	const [totalBill, setTotalBill] = useState(15000);
	const [initialPayment, setInitialPayment] = useState(7000);
	const [balance, setBalance] = useState('8,000');
	const initialPayODD__ref = useRef();
	const totalPayODD__ref = useRef();
	const initialPayEVEN__ref = useRef();
	const totalPayEVEN__ref = useRef();

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
							{Array.from({ length: 5 }).map((_) => (
								<>
									<tr
										className="rowOdd"
										onClick={() =>
											handleOnClickRow({
												totalB: 2500,
												initialPay: 1200,
											})
										}
									>
										<td>BrandBrand Data</td>
										<td>Model Data</td>
										<td>VendorVendor Data</td>
										<td>Quantity Data</td>
										<td>1200</td>
										<td>Pay My Payment Datta</td>
										<td>Pur DateDateDate Data</td>
										<td>2500</td>
									</tr>
									<tr
										className="rowEven"
										onClick={() =>
											handleOnClickRow({
												totalB: 5000,
												initialPay: 1600,
											})
										}
									>
										<td>Brand Data</td>
										<td>Model Data</td>
										<td>Vendor Data</td>
										<td>Quantity Data</td>
										<td>1600</td>
										<td>Pay Date Data</td>
										<td>Pur Date Data</td>
										<td>5000</td>
									</tr>
									<tr
										className="rowOdd"
										onClick={() =>
											handleOnClickRow({
												totalB: 1919,
												initialPay: 1200,
											})
										}
									>
										<td>BrandBrand Data</td>
										<td>Model Data</td>
										<td>VendorVendor Data</td>
										<td>Quantity Data</td>
										<td>1200</td>
										<td>Pay My Payment Datta</td>
										<td>Pur DateDateDate Data</td>
										<td ref={totalPayODD__ref}>1919</td>
									</tr>
									<tr
										className="rowEven"
										onClick={() =>
											handleOnClickRow({
												totalB: 4652,
												initialPay: 1600,
											})
										}
									>
										<td>Brand Data</td>
										<td>Model Data</td>
										<td>Vendor Data</td>
										<td>Quantity Data</td>
										<td ref={initialPayEVEN__ref}>1600</td>
										<td>Pay Date Data</td>
										<td>Pur Date Data</td>
										<td ref={totalPayEVEN__ref}>4652</td>
									</tr>
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
