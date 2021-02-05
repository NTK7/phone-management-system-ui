import { Button } from '@material-ui/core';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import './Order.css';

function Order() {
	const [searchByBrand, setSearchByBrand] = useState('');

	const searchByBrandFunction = () => {
		alert(searchByBrand);
	};

	return (
		<div className="order">
			{/* Search by brand section */}
            <br/>
			<div className="order__searchByBrand">
				<input
					type="text"
					placeholder="Search by vendor"
					onChange={(e) => setSearchByBrand(e.target.value)}
					value={searchByBrand}
				/>{' '}
				<Button onClick={searchByBrandFunction}>Search</Button>
			</div>

			{/* Billing section */}
			<div className="order__billing">
				<Table responsive striped bordered hover variant="dark">
					<thead>
						{/* Headings of the table */}
						<tr>
							<th>BRAND</th>
							<th>MODEL</th>
							<th>QUANTITY</th>
							<th>ORIGINAL PRICE</th>
						</tr>
					</thead>
					<tbody>
						{/* Creating dummy data with 20 rows */}
						{Array.from({ length: 3 }).map((_) => (
							<>
								<tr className="rowOdd">
									<td>Brand Data</td>
									<td>Model Data</td>
									<td>Quantity Data</td>
									<td>Original Price Data</td>
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

			{/* Total Section */}
			<div className="order__total"></div>
		</div>
	);
}

export default Order;
