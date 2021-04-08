import { Button, Card } from '@material-ui/core';
import { useRef, useState } from 'react';
import { ListGroup, Table, Modal, Row } from 'react-bootstrap';
import './ViewInventory.css';
import React from 'react';
import { db } from './../../firebase';

function ViewInventory() {
	const [inventory, inventorydata] = React.useState([]);
	const [searchVendorName, setSearchVendorName] = useState('');
	const [totalBill, setTotalBill] = useState();
	const [initialPayment, setInitialPayment] = useState();
	const [docId, setDocId] = useState();
	const [pay, setPay] = useState([]);
	const [myPayment, setMyPayment] = useState();
	const [inve, setInve] = useState();
	const [show, setShow] = useState(false);

	const getInventorynfo = async () => {
		db.collection('inventory').where('Brand', '==', searchVendorName);
		const docs = [];
		const snapshot = await db.collection('inventory').where('Brand', '==', searchVendorName).get();
		snapshot.forEach((doc) => {
			let docdata = doc.data();

			//convert pay date normal
			let pay_date = doc.data().pay_date.toDate().toDateString();
			let pur_date = doc.data().pay_date.toDate().toDateString();
			let pay_history = doc.data().pay_history;
			console.log(pay_history);
			//getting document id
			let docid = doc.id;
			const data = {
				Brand: `${docdata.Brand}`,
				model: `${docdata.model}`,
				vendor: `${docdata.vendor}`,
				qty: `${docdata.qty}`,
				my_payment: `${docdata.my_payment}`,
				pay_date: `${pay_date}`,
				pur_date: `${pur_date}`,
				total: `${docdata.total}`,
				docid: `${docid}`,
				payhistory: pay_history,
			};
			docs.push(data);
		});
		inventorydata(docs);
	};

	// For search
	//  SEARCH VENDOR BY NAME
	const searchVendor = () => {
		if (searchVendorName == '') {
			setSearchVendorName('');
		} else {
			getInventorynfo();
		}
		// clear the text field once searching is done
		setSearchVendorName('');
	};

	const payBalance = () => {
		var newdt = pay;
		const date = new Date().toString();
		const st1 = Number(myPayment);
		const my_total_pay = st1 + Number(initialPayment);
		newdt.push(st1);
		newdt.push(date);
		console.log(pay);
		db.collection('inventory').doc(docId).update({
			pay_history: newdt,
			my_payment: my_total_pay,
			pay_date: new Date(),
		});
	};

	const handleOnClickRow = (input) => {
		setInitialPayment(input?.initialPay);
		setTotalBill(input?.totalB);
		setDocId(input?.docId);
		setPay(input?.payHistory);
		console.log(pay);
	};

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<div className="viewInventory">
			{/* search by vendor */}
			<div className="viewInventory__top">
				{/* input and search button to search for the vender */}
				<div className="viewInventory__topTableAndSearchSection">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							searchVendor();
						}}
						className="viewInventory__topInput"
					>
						<input
							type="text"
							placeholder="Search by vendor"
							onChange={(e) => setSearchVendorName(e.target.value)}
							value={searchVendorName}
						/>{' '}
						<Button onClick={searchVendor}>Search</Button>
					</form>
					<div className="viewInventory__topTableHeading">
						<Table responsive striped bordered hover variant="dark">
							<thead>
								{/* Headings of the table */}
								<tr>
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
							{inventory.map((inv, index) => (
								<>
									<tr
										className="rowOdd"
										key={index}
										onClick={() => {
											console.log(inv);
											handleOnClickRow({
												totalB: inv.total,
												initialPay: inv.my_payment,
												docId: inv.docid,
												payHistory: inv.payhistory,
											});
										}}
									>
										<td>{inv.vendor}</td>
										<td>{inv.qty}</td>
										<td>
											<Button variant="primary" onClick={handleShow}>
												{inv.my_payment}
											</Button>
											<Modal show={show} onHide={handleClose}>
												<Modal.Header closeButton>
													<Modal.Title>Payment History</Modal.Title>
												</Modal.Header>
												<Modal.Body>
													{inv.payhistory.map((arr) => {
														{
															console.log(arr);
														}
														return (
															<ul>
																<li>{arr}</li>
															</ul>
														);
													})}
												</Modal.Body>
												<Modal.Footer>
													<Button variant="secondary" onClick={handleClose}>
														Close
													</Button>
												</Modal.Footer>
											</Modal>
										</td>

										<td>{inv.pay_date}</td>
										<td>{inv.pur_date}</td>
										<td>{inv.total}</td>
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
						<ListGroup.Item className="viewInventory__bottomCardListGroupItem">
							<span>My Payment:</span> <input type="text" onChange={(e) => setMyPayment(e.target.value)} />
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
