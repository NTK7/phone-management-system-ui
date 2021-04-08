import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../features/userSlice';
import { auth, db } from '../../firebase';
import './SignUp.css';

function SignUp() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	// Register user
	const registerUser = () => {
		// User authentication
		if (!email || !password) {
			alert('Please fill all the fields!');
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
								})
							);
						});

					alert('Welcome ' + name + '!');
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
				.catch((error) => alert(error));
		}

		setEmail('');
		setPassword('');
	};

	// Sign In User
	const signInUser = () => {
		// User authentication
		if (!email || !password) {
			alert('Please fill all the fields!');
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
						})
					);

					alert('Welcome ' + name + '!');
				})
				.catch((error) => alert(error));
		}

		setEmail('');
		setPassword('');
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
						<button onClick={registerUser}>Register</button>
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
