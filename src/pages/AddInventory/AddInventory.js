import { Tab } from 'bootstrap';
import { Tabs } from 'react-bootstrap';
import './AddInventory.css';

function AddInventory() {
	return (
		<div className="addInventory">
			<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
				<Tab eventKey="home" title="Insert">
					<div></div>
				</Tab>
				<Tab eventKey="profile" title="Update">
					<div></div>
				</Tab>
			</Tabs>
		</div>
	);
}

export default AddInventory;
