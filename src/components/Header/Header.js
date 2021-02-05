import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
	return (
		<div>
			<div className="header__nav">
				<div className="header__navLeft">
					<h4>Phone Shop</h4>
				</div>
				<div className="header__navRight">
					<h6>
						<Link to="/view+inventory">View Inventory</Link>
					</h6>
                    <h6>
						<Link to="/add+inventory">Add Inventory</Link>
					</h6>
                    <h6>
						<Link to="/order">Order</Link>
					</h6>
				</div>
			</div>
		</div>
	);
}

export default Header;
