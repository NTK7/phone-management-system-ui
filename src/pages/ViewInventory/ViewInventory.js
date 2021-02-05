import { Button } from '@material-ui/core';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import './ViewInventory.css';

function ViewInventory() {
	const [searchVendorName, setSearchVendorName] = useState();

	return (
		<div className="viewInventory">
			{/* search by vendor */}
			<div className="viewInventory__top">
				<div className="viewInventory__topInput">
					<input type="text" placeholder="Search by vendor" onChange={(e) => setSearchVendorName(e.target.value)} />{' '}
					<Button>Search</Button>
				</div>
				<div className="viewInventory__topTable">
					<Table responsive>
						<thead>
							<tr>
								<th>#</th>
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
						</tbody>
					</Table>
				</div>
			</div>

			{/* table */}

			{/* total bill section */}
			<div className="viewInventory__bottom"></div>
		</div>
	);
}

export default ViewInventory;
