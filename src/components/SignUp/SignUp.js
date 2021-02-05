import './SignUp.css';

function SignUp() {
	return (
		<div className="signUp">
			<div className="signUp__container">
				<h3>Sign in</h3>
				<input type="text" placeholder="Email" />
				<input type="text" placeholder="Password" />

				<p>Forgot your password?</p>

				<button>Sign In</button>
			</div>
		</div>
	);
}

export default SignUp;
