import { Button } from '@material-ui/core';
import { Alert, Tab } from 'bootstrap';
import { useState } from 'react';
import { FormControl, InputGroup, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectViewInventData, addInventoryData } from '../../features/viewInventorySlice';

import './AddInventory.css';

function AddInventory() {
	const dispatch = useDispatch();
	const viewInventData = useSelector(selectViewInventData);

	// insert variables
	const [insertBrand, setInsertBrand] = useState('');
	const [insertModel, setInsertModel] = useState('');
	const [insertVendor, setInsertVendor] = useState('');
	const [insertMyPayment, setInsertMyPayment] = useState('');
	const [insertQuantity, setInsertQuantity] = useState('');
	const [insertPayDate, setInsertPayDate] = useState('');
	const [insertPurDate, setInsertPurDate] = useState('');
	const [insertTotal, setInsertTotal] = useState('');

	// update variables
	const [updateBrand, setUpdateBrand] = useState('');
	const [updateModel, setUpdateModel] = useState('');
	const [updateVendor, setUpdateVendor] = useState('');
	const [updateMyPayment, setUpdateMyPayment] = useState('');
	const [updateQuantity, setUpdateQuantity] = useState('');
	const [updatePayDate, setUpdatePayDate] = useState('');
	const [updatePurDate, setUpdatePurDate] = useState('');
	const [updateTotal, setUpdateTotal] = useState('');

	// Insert and Update color change
	const [insertColor, setInsertColor] = useState(true);

	// this is the insert method
	const insertRecord = () => {
		// field validation
		if (
			!insertBrand ||
			!insertModel ||
			!insertMyPayment ||
			!insertPayDate ||
			!insertPurDate ||
			!insertQuantity ||
			!insertTotal ||
			!insertVendor
		) {
			alert('Please fill all the fields!');
		} else {
			// (REMEMBER TO UPDATE THE DATABASE WITH THIS ITEM ELSE IT WONT UPDATE THE VIEW INVENTORY)
			dispatch(
				addInventoryData({
					brand: insertBrand,
					model: insertModel,
					vendor: insertVendor,
					quantity: insertQuantity,
					myPayment: insertMyPayment,
					payDate: insertPayDate,
					purDate: insertPurDate,
					total: insertTotal,
				})
			);
		}

		// clearing all the fields after backend implementation
		setInsertBrand('');
		setInsertModel('');
		setInsertVendor('');
		setInsertMyPayment('');
		setInsertQuantity('');
		setInsertPayDate('');
		setInsertPurDate('');
		setInsertTotal('');
	};

	// this is the update method
	const updateRecord = () => {
		// field validation
		if (
			!updateBrand ||
			!updateModel ||
			!updateMyPayment ||
			!updatePayDate ||
			!updatePurDate ||
			!updateQuantity ||
			!updateTotal ||
			!updateVendor
		) {
			alert('Please fill all the fields!');
		}
		// clearing all the fields after backend implementation
		setUpdateBrand('');
		setUpdateModel('');
		setUpdateVendor('');
		setUpdateMyPayment('');
		setUpdateQuantity('');
		setUpdatePayDate('');
		setUpdatePurDate('');
		setUpdateTotal('');
	};
	return (
		<div className="addInventory">
			<div className="addInventory__section">
				<div className="addInventory__sectionInner">
					<Tabs
						defaultActiveKey="home"
						id="uncontrolled-tab-example"
						className={` tabs ${!insertColor && 'tab__insert'}`}
						onSelect={() => setInsertColor(!insertColor)}
					>
						<Tab eventKey="home" title="Insert" className="tab">
							<div className="tab__details">
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text id="basic-addon1" className="input__label">
											Brand
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Brand"
										aria-label="Enter Brand"
										aria-describedby="basic-addon1"
										value={insertBrand}
										onChange={(e) => setInsertBrand(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon2">
											Model
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Model"
										aria-label="Enter Model"
										aria-describedby="basic-addon2"
										value={insertModel}
										onChange={(e) => setInsertModel(e.target.value)}
									/>
								</InputGroup>
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
									<FormControl
										placeholder="Pay Date"
										aria-label="Pay Date"
										aria-describedby="basic-addon6"
										value={insertPayDate}
										onChange={(e) => setInsertPayDate(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon7">
											Pur Date
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Puy Date"
										aria-label="Puy Date"
										aria-describedby="basic-addon7"
										value={insertPurDate}
										onChange={(e) => setInsertPurDate(e.target.value)}
									/>
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
									<Button onClick={insertRecord}>INSERT</Button>
								</div>
							</div>
						</Tab>
						<Tab eventKey="profile" title="Update" className="tab">
							<div className="tab__details">
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon9">
											Brand
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Brand"
										aria-label="Enter Brand"
										aria-describedby="basic-addon9"
										value={updateBrand}
										onChange={(e) => setUpdateBrand(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon10">
											Model
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Model"
										aria-label="Enter Model"
										aria-describedby="basic-addon10"
										value={updateModel}
										onChange={(e) => setUpdateModel(e.target.value)}
									/>
								</InputGroup>
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
											Quantity
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter Quantity"
										aria-label="Enter Quantity"
										aria-describedby="basic-addon12"
										value={updateQuantity}
										onChange={(e) => setUpdateQuantity(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon13">
											My Payment
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Enter My Payment"
										aria-label="Enter My Payment"
										aria-describedby="basic-addon13"
										value={updateMyPayment}
										onChange={(e) => setUpdateMyPayment(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon14">
											Pay Date
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Pay Date"
										aria-label="Pay Date"
										aria-describedby="basic-addon14"
										value={updatePayDate}
										onChange={(e) => setUpdatePayDate(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon15">
											Pur Date
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Puy Date"
										aria-label="Puy Date"
										aria-describedby="basic-addon15"
										value={updatePurDate}
										onChange={(e) => setUpdatePurDate(e.target.value)}
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text className="input__label" id="basic-addon16">
											Total
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Total"
										aria-label="Total"
										aria-describedby="basic-addon16"
										value={updateTotal}
										onChange={(e) => setUpdateTotal(e.target.value)}
									/>
								</InputGroup>

								<div className="tab__buttonAction">
									<Button onClick={updateRecord}>UPDATE</Button>
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
