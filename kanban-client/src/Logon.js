import React from 'react';
import LogonForm from './Components/LogonForm'
import Header from './Components/Header';

export default function Login() {
	return (
		<React.Fragment>
			<Header />
			<div className="container">
				<div className="modal is-active">
					<div className="modal-card">
						<section className="modal-card-body has-no-background">
							<LogonForm />
						</section>
						<div className="modal-card"></div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
