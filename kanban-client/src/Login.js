import React from 'react';
import LoginForm from './Components/LoginForm'
import Header from './Components/Header';

export default function Login() {
	return (
		<React.Fragment>
			<Header />
			<div className="container">
				<div className="modal is-active">
					<div className="modal-card">
						<section className="modal-card-body has-no-background">
							<LoginForm />
						</section>
						<div className="modal-card"></div>
					</div>
					<img src="https://bulma.io/images/made-with-bulma--white.png" alt="Made with Bulma" width="128" height="24"></img>
				</div>
			</div>
		</React.Fragment>
	);
}
