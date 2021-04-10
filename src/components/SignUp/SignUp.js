import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, logout, selectUser } from '../../features/userSlice';
import { auth, db } from '../../firebase';
import './SignUp.css';

function SignUp() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const dispatch = useDispatch();
	const [alertMessage, setAlertMessage] = useState('Loading . . .');
	const history = useHistory();

	// You can use this variable with the useSelector method to use the user details anywhere
	const user = useSelector(selectUser);

	// Alert
	const customAlert = (message) => {
		return (
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Message
							</h5>
							<button
								onClick={() => setAlertMessage('Loading...')}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">{message}</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								data-dismiss="modal"
								aria-label="Close"
								onClick={() => setAlertMessage('Loading...')}
							>
								OK
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	// Register user
	const registerUser = () => {
		// User authentication
		if (!email || !password) {
			setAlertMessage('Please fill all the fields below!');
		} else {
			// Perform user registration
			let name = email.split('@')[0];
			console.log('registering');
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((userAuth) => {
					userAuth.user
						.updateProfile({
							displayName: name,
						})
						.then(() => {
							dispatch(
								login({
									email: userAuth.user?.email,
									uid: userAuth.user?.uid,
									userName: name,
									shop_code: 'MSB-001',
								})
							);
						});

					console.log(user);
					// Adding to "user" collection in the database
					db.collection('user').add({
						UID: userAuth.user?.uid,
						password: password,
						shop_code: 'MSB-001',
						userName: name,
						email: email,
					});
				})
				.then(() => {
					setAlertMessage('Welcome ' + name + '!');
				})
				.catch((error) => {
					console.log(error?.message);
					setAlertMessage(error?.message);
				});
		}

		setEmail('');
		setPassword('');
		history.replace('/home');
	};

	// Sign In User
	const signInUser = () => {
		// User authentication
		if (!email || !password) {
			setAlertMessage('Please fill all the fields below!');
		} else {
			// Splitting email to get name
			let name = email.split('@')[0];

			// If not present perform Register action else login actions
			console.log('Signing in');
			// Perform user login
			auth
				.signInWithEmailAndPassword(email, password)
				.then((userAuth) => {
					dispatch(
						login({
							email: userAuth.user?.email,
							uid: userAuth.user?.uid,
							userName: name,
							shop_code: 'MSB-001',
						})
					);

					setAlertMessage('Welcome ' + name + '!');
				})
				.catch((error) => {
					setAlertMessage(error?.message);
				});
		}

		setEmail('');
		setPassword('');
		history.replace('/home');
		
	};

	// Sign Out User
	const signOutUser = () => {
		dispatch(logout());
		setAlertMessage('You have logged out!');
	};

	return (
		<div className="signUp">
			{customAlert(alertMessage)}
			<div className="signUp__container">
				{!user ? (
					<>
						<h3>Sign in</h3>
						<input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
						<input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />

						<p>Forgot your password?</p>

						<button data-toggle="modal" data-target="#exampleModal" onClick={signInUser}>
							Sign In
						</button>
						<button data-toggle="modal" data-target="#exampleModal" onClick={registerUser}>
							Register
						</button>
					</>
				) : (
					<>
						<h3>Sign out</h3>
						<button data-toggle="modal" data-target="#exampleModal" onClick={signOutUser}>
							Sign Out
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default SignUp;
