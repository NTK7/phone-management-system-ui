import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
	// You can use this variable with the useSelector method to use the user details anywhere
	const user = useSelector(selectUser);

	return (
		<div>
			<div className="header__nav">
				<div className="header__navLeft">
					<h4>
						<Link to={user ? '/home' : '/'}>Phone Shop</Link>
					</h4>
				</div>
				<div className="header__navRight">
					{user && (
						<>
							<h6>
								<NavLink activeClassName="border__view" to={user ? '/view+inventory' : '/signOut'}>
									View Inventory
								</NavLink>
							</h6>
							<h6>
								<NavLink activeClassName="border__add" to={user ? '/add+inventory' : '/signOut'}>
									Add Inventory
								</NavLink>
							</h6>
							<h6>
								<NavLink activeClassName="border__order" to={user ? '/order' : '/signOut'}>
									Order
								</NavLink>
							</h6>

							<h6>
								<NavLink activeClassName="border__signUp" to="/signOut">
									Sign Out
								</NavLink>
							</h6>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
