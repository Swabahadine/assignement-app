import React, { useCallback, useContext, useState } from 'react';
import { Form, Field, FieldError } from 'react-jsonschema-form-validation';
import { useMutation } from 'react-query';
import {
	UncontrolledAlert,
	Button,
	Card,
	CardBody,
	CardTitle,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import errorMessages from '../lib/Form/errorMessages';
import { updateAuth } from '../lib/authentication';

import './Login.css';
import { fetchAuth } from '../apiRequests/auth';
import { UserContext } from '../context/UserContext';

const schema = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string' },
	},
	required: ['username', 'password'],
};
const InputUsername = ({ ...props }) => (
	<InputGroup className="">
		<InputGroupAddon addonType="prepend">
			<InputGroupText> <i className="fa fa-user" /> </InputGroupText>
		</InputGroupAddon>
		<Input {...props} className="form-control" placeholder="Identifiant" type="text" />
	</InputGroup>
);

const InputPassword = ({ ...props }) => (
	<InputGroup>
		<InputGroupAddon addonType="prepend">
			<InputGroupText> <i className="fa fa-lock" /> </InputGroupText>
		</InputGroupAddon>
		<Input {...props} className="form-control" placeholder="******" type="password" />
		<div className="invalid-feedback">
			Merci de renseigner votre mot de passe.
		</div>
	</InputGroup>
);

const PageLogin = () => {
	const history = useHistory();
	const [, setUser] = useContext(UserContext);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { mutate: mutateAuth, isError } = useMutation(fetchAuth, {
		onSuccess: (user) => {
			updateAuth({ ...user, password: formData.password });
			setUser(user);
			history.push('/search');
		},
	});

	const handleChange = (newData) => {
		setFormData(newData);
	};

	const handleSubmit = useCallback(async () => {
		mutateAuth(formData);
	}, [formData, mutateAuth]);

	return (
		<div className="Login d-flex flex-column vh-100 align-items-center justify-content-center">
			{isError && (
				<UncontrolledAlert className="login-min-width" color="danger">
					Identifiant ou mot de passe incorrect !<br />
					Merci de réessayer.
				</UncontrolledAlert>
			)}
			<Form
				data={formData}
				errorMessages={errorMessages}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={schema}
			>
				<Card className="m-auto login-min-width">
					<CardBody className="card-body">
						<CardTitle className="h4 card-title text-center mb-4 mt-1">Connexion</CardTitle>
						<hr />
						<FormGroup className="">
							<Field
								component={InputUsername}
								name="username"
								id="username"
								value={formData.username}
							/>
							<FieldError name="username">
								Merci de renseigner votre identifiant.
							</FieldError>
						</FormGroup>
						<FormGroup className="">
							<Field
								component={InputPassword}
								name="password"
								id="password"
								value={formData.password}
							/>
							<FieldError name="password">
								Merci de renseigner votre mot de passe.
							</FieldError>
						</FormGroup>
						<FormGroup className="">
							<Button
								type="submit"
								className="ce-button-primary btn-block"
							>
								Connexion
							</Button>
						</FormGroup>
					</CardBody>
				</Card>
			</Form>
		</div>
	);
};

export default PageLogin;
