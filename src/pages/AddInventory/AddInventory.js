import { Button } from '@material-ui/core';
import { Alert, Tab } from 'bootstrap';
import { useEffect, useState } from 'react';
import { FormControl, InputGroup, Tabs } from 'react-bootstrap';
import './AddInventory.css';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { db } from './../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function AddInventory() {
	// This is the user variable
	const user = useSelector(selectUser);
	useEffect(() => {
		console.log(user);
	}, []);

	// insert variables
	const [insertBrand, setInsertBrand] = useState('');
	const [insertModel, setInsertModel] = useState('');
	const [insertVendor, setInsertVendor] = useState('');
	const [insertMyPayment, setInsertMyPayment] = useState('');
	const [insertQuantity, setInsertQuantity] = useState('');
	const [insertPayDate, setInsertPayDate] = useState(new Date());
	const [insertPurDate, setInsertPurDate] = useState(new Date());
	const [insertTotal, setInsertTotal] = useState('');

	// update variables
	const [updateBrand, setUpdateBrand] = useState('');
	const [updateModel, setUpdateModel] = useState('');
	const [updateVendor, setUpdateVendor] = useState('');
	const [updateMyPayment, setUpdateMyPayment] = useState('');
	const [updateQuantity, setUpdateQuantity] = useState('');
	const [updatePayDate, setUpdatePayDate] = useState('');
	const [updateOriginalPrice, setUpdateOriginalPrice] = useState('');
	const [updateSellingPrice, setupdateSellingPrice] = useState('');
	const [itemCode, setItemCode] = useState();
	// Insert and Update color change
	const [insertColor, setInsertColor] = useState(true);
	const [displayAlert, setDisplayAlert] = useState(false);

	// this is the insert method
	const insertRecord = () => {
		// field validation
		if (!insertMyPayment || !insertPayDate || !insertPurDate || !insertQuantity || !insertTotal || !insertVendor) {
			setDisplayAlert(true);
		} else {
			setDisplayAlert(false);

			const data = {
				vendor: insertVendor,
				quantity: insertQuantity,
				my_payment: insertMyPayment,
				pay_date: insertPayDate,
				pur_date: insertPurDate,
				total: insertTotal,
				pay_history: [insertMyPayment, insertPayDate.toString()],
				shop_code: user?.shop_code, // <----------- THIS IS THE SHOP CODE WHICH COMES FROM THE USER VARIABLE
			};

			// Adding item to inventory collection
			db.collection('inventory')
				.add(data)
				.then((docRef) => {
					console.log('Document written with ID: ', docRef.id);
				});

			// THIS IS WHERE YOU HAVE TO ADD THE ITEM INTO THE COLLECTION LIST
			// This is item data to be inserted into the collection called 'item'
			// Adding item to the item collection
			// db.collection('item').add();
		}

		// clearing all the fields after backend implementation
		setInsertVendor('');
		setInsertMyPayment('');
		setInsertQuantity('');
		setInsertPayDate(new Date());
		setInsertPurDate(new Date());
		setInsertTotal('');
	};

	// Alert
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
								Error
							</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">{message}</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">
								OK
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	// this is the update method
	const updateRecord = () => {
		// field validation
		if (
			!updateBrand ||
			!updateModel ||
			!updateOriginalPrice ||
			!updateQuantity ||
			!updateSellingPrice ||
			!updateVendor
		) {
			setDisplayAlert(true);
		} else {
			setDisplayAlert(false);

			const docs = [];
			db.collection('item')
				.get()
				.then((res) => {
					console.log(res.size);
					const sizes = res.size;
					docs.push(sizes);
				});
			setItemCode(docs);

			let newCode = itemCode + 1;
			console.log(itemCode);
			console.log(newCode);
			let ITEMCODE = 'ITC -' + newCode;
			const data = {
				code: ITEMCODE,
				vendor: updateVendor,
				quantity: updateQuantity,
				originalPrice: updateOriginalPrice,
				sellingprice: updateSellingPrice,
				shop_code: user?.shop_code,
				date: new Date(),
			};
			db.collection('item')
				.add(data)
				.then((docRef) => {
					console.log('Document written with ID: ', docRef.id);
				});
		}
		// clearing all the fields after backend implementation
		setUpdateBrand('');
		setUpdateModel('');
		setUpdateVendor('');
		setUpdateQuantity('');
	};
	return (
		<div className="addInventory">
			{displayAlert && customAlert('Please fill all the fields below!')}

			<div className="addInventory__section">
				<div className="addInventory__sectionInner">
					<Tabs
						defaultActiveKey="home"
						id="uncontrolled-tab-example"
						className={` tabs ${!insertColor && 'tab__insert'}`}
						onSelect={() => setInsertColor(!insertColor)}
					>
						<Tab eventKey="home" title="Add Invoice" className="tab">
							<div className="tab__details">
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon3">
											Vendor
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Vendor"
										aria-label="Enter Vendor"
										aria-describedby="basic-addon3"
										value={insertVendor}
										onChange={(e) => setInsertVendor(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon4">
											Quantity
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Quantity"
										aria-label="Enter Quantity"
										aria-describedby="basic-addon4"
										value={insertQuantity}
										onChange={(e) => setInsertQuantity(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon5">
											My Payment
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter My Payment"
										aria-label="Enter My Payment"
										aria-describedby="basic-addon5"
										value={insertMyPayment}
										onChange={(e) => setInsertMyPayment(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon6">
											Pay Date
										</InputGroup.Text>
									</InputGroup.Prepend>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<DateTimePicker value={insertPayDate} onChange={setInsertPayDate} disableFuture />
									</MuiPickersUtilsProvider>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon7">
											Pur Date
										</InputGroup.Text>
									</InputGroup.Prepend>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<DateTimePicker value={insertPurDate} onChange={setInsertPurDate} disableFuture />
									</MuiPickersUtilsProvider>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon8">
											Total
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Total"
										aria-label="Total"
										aria-describedby="basic-addon8"
										value={insertTotal}
										onChange={(e) => setInsertTotal(e.target.value)}
									/>
								</InputGroup>

								<div className="tab__buttonAction">
									<Button
										onClick={insertRecord}
										disabled={!user && true}
										data-toggle="modal"
										data-target="#exampleModal"
									>
										INSERT
									</Button>
								</div>
							</div>
						</Tab>
						<Tab eventKey="profile" title="Add Items" className="tab">
							<div className="tab__details">
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon11">
											Vendor
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Vendor"
										aria-label="Enter Vendor"
										aria-describedby="basic-addon11"
										value={updateVendor}
										onChange={(e) => setUpdateVendor(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon12">
											Brand
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Quantity"
										aria-label="Enter Quantity"
										aria-describedby="basic-addon12"
										value={updateBrand}
										onChange={(e) => setUpdateBrand(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon13">
											Model
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter My Payment"
										aria-label="Enter My Payment"
										aria-describedby="basic-addon13"
										value={updateModel}
										onChange={(e) => setUpdateModel(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon14">
											Quantity
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Pay Date"
										aria-label="Pay Date"
										aria-describedby="basic-addon14"
										value={updateQuantity}
										onChange={(e) => setUpdateQuantity(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon15">
											Original Price
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Puy Date"
										aria-label="Puy Date"
										aria-describedby="basic-addon15"
										value={updateOriginalPrice}
										onChange={(e) => setUpdateOriginalPrice(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon16">
											Selling Price
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Total"
										aria-label="Total"
										aria-describedby="basic-addon16"
										value={updateSellingPrice}
										onChange={(e) => setupdateSellingPrice(e.target.value)}
									/>
								</InputGroup>

								<div className="tab__buttonAction">
									<Button
										onClick={updateRecord}
										disabled={!user && true}
										data-toggle="modal"
										data-target="#exampleModal"
									>
										UPDATE
									</Button>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default AddInventory;
