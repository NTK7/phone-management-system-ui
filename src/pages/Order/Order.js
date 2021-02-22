import { Button, Card } from '@material-ui/core';
import { useState } from 'react';
import { ListGroup, Table } from 'react-bootstrap';
import './Order.css';

function Order() {
	const [searchByBrand, setSearchByBrand] = useState('');
	const [searchByBrandModel, setSearchByBrandModel] = useState('');

	const searchByBrandFunction = () => {
		alert(searchByBrand);
	};

	const searchByBrandAndModelFunction = () => {
		alert(searchByBrandModel);
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
							{Array.from({ length: 3 }).map((_) => (
								<>
									<tr className="rowOdd">
										<td> DataBrand Data</td>
										<td>Model DataModel </td>
										<td>Quantity DataQuantity Data</td>
										<td>Original Price DataPrice Data</td>
									</tr>
									<tr className="rowEven">
										<td>Brand Data</td>
										<td>Model Data</td>
										<td>Quantity Data</td>
										<td>Original Price Data</td>
									</tr>
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
								{Array.from({ length: 2 }).map((_) => (
									<>
										<tr className="rowOdd">
											<td>Item Data</td>
											<td>
												<input type="text" placeholder="Quantity" />
											</td>
											<td>
												<input type="text" placeholder="Selling Price" />
											</td>
											<td>Total bill Data</td>
										</tr>
										<tr className="rowEven">
											<td>Item Data</td>
											<td>
												<input type="text" placeholder="Quantity" />
											</td>
											<td>
												<input type="text" placeholder="Selling Price" />
											</td>
											<td>Total bill Data</td>
										</tr>
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
