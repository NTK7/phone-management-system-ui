import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../features/userSlice';
import './SignUp.css';

function SignUp() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	// Sign In User
	const signInUser = () => {
		if (!email || !password) {
			alert('Please fill all the fields!');
		} else {
			dispatch(
				login({
					email: 'some email',
				})
			);
		}
	};

	// Sign Out User
	const signOutUser = () => {
		dispatch(logout());
	};

	return (
		<div className="signUp">
			<div className="signUp__container">
				{!user ? (
					<>
						<h3>Sign in</h3>
						<input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
						<input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />

						<p>Forgot your password?</p>

						<button onClick={signInUser}>Sign In</button>
					</>
				) : (
					<>
						<h3>Sign out</h3>
						<button onClick={signOutUser}>Sign Out</button>
					</>
				)}
			</div>
		</div>
	);
}

export default SignUp;
