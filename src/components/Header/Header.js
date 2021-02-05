import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
	const [borderView, setBorderView] = useState(false);
	const [borderAdd, setBorderAdd] = useState(false);
	const [borderOrder, setBorderOrder] = useState(false);
	const [borderSignUp, setborderSignUp] = useState(false);

	useEffect(() => {
		console.log(window.location.href);
		if (window.location.pathname === '/view+inventory') {
			setBorderView(true);
			setborderSignUp(false);
			setBorderAdd(false);
			setBorderOrder(false);
		} else if (window.location.pathname === '/add+inventory') {
			setBorderView(false);
			setborderSignUp(false);
			setBorderAdd(true);
			setBorderOrder(false);
		} else if (window.location.pathname === '/order') {
			setBorderView(false);
			setborderSignUp(false);
			setBorderAdd(false);
			setBorderOrder(true);
		}
	}, []);

	const activeViewInventory = () => {
		setBorderView(true);
		setborderSignUp(false);
		setBorderAdd(false);
		setBorderOrder(false);
	};
	const activeAddInventory = () => {
		setBorderView(false);
		setborderSignUp(false);
		setBorderAdd(true);
		setBorderOrder(false);
	};
	const activeOrderInventory = () => {
		setBorderView(false);
		setborderSignUp(false);
		setBorderAdd(false);
		setBorderOrder(true);
	};

	const activeSignUpInventory = () => {
		setBorderView(false);
		setborderSignUp(true);
		setBorderAdd(false);
		setBorderOrder(false);
	};

	return (
		<div>
			<div className="header__nav">
				<div className="header__navLeft">
					<h4>
						<Link to="/">Phone Shop</Link>
					</h4>
				</div>
				<div className="header__navRight">
					<h6 className={borderView && 'border__view'}>
						<Link to="/view+inventory" onClick={activeViewInventory}>
							View Inventory
						</Link>
					</h6>
					<h6 className={borderAdd && 'border__add'}>
						<Link to="/add+inventory" onClick={activeAddInventory}>
							Add Inventory
						</Link>
					</h6>
					<h6 className={borderOrder && 'border__order'}>
						<Link to="/order" onClick={activeOrderInventory}>
							Order
						</Link>
					</h6>
					<h6 className={borderSignUp && 'border__signUp'}>
						<Link to="/signUp" onClick={activeSignUpInventory}>
							Sign In
						</Link>
					</h6>
				</div>
			</div>
		</div>
	);
}

export default Header;
