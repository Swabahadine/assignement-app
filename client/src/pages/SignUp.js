import React, { useCallback, useState } from 'react';
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
import { Link } from 'react-router-dom';

import Select from 'react-select';
import { USER_ROLE } from '../lib/api/enums';
import errorMessages from '../lib/Form/errorMessages';

import './Login.css';
import { fetchSignUp } from '../apiRequests/auth';

const schema = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string' },
		role: {
			type: 'object',
			properties: {
				label: { type: 'string', enum: Object.values(USER_ROLE) },
				value: { type: 'string', enum: Object.keys(USER_ROLE) },
			},
			required: ['label', 'value'],
		},
	},
	required: ['username', 'password', 'role'],
};

const InputUsername = ({ ...props }) => (
	<InputGroup className="">
		<InputGroupAddon addonType="prepend">
			<InputGroupText> <i className="fa fa-user" /> </InputGroupText>
		</InputGroupAddon>
		<Input {...props} className="form-control" placeholder="Identifiant" type="text" />
	</InputGroup>
);
const options = Object.keys(USER_ROLE).map((key) => ({
	label: USER_ROLE[key],
	value: key,
}));
const SelectRole = ({ ...props }) => (
	<InputGroup className="w-100">
		<Select {...props} placeholder="Roles" options={options} />
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

const PageSignUp = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		role: '',
	});

	const {
		mutate: mutateSignUp,
		isError,
		error,
		isSuccess,
	} = useMutation(fetchSignUp);

	const handleChange = (newData) => {
		setFormData(newData);
	};

	const handleChangeRole = (newData) => {
		setFormData((prev) => ({ ...prev, role: newData }));
	};

	const handleSubmit = useCallback(() => {
		const { value: role } = formData.role;
		mutateSignUp({ ...formData, role });
	}, [formData, mutateSignUp]);

	return (
		<div className="Login d-flex flex-column vh-100 align-items-center justify-content-center">
			{isError && (
				<UncontrolledAlert className="login-min-width" color="danger">
					{error.message}<br />
					Merci de réessayer.
				</UncontrolledAlert>
			)}
			{isSuccess && (
				<UncontrolledAlert className="login-min-width" color="success">
					L&apos;utilisateur à bien été créé.<br />
					<Link to="/login"><b>Se connecter</b></Link>
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
						<CardTitle className="h4 card-title text-center mb-4 mt-1">Create an account</CardTitle>
						<hr />
						<FormGroup className="">
							<Field
								component={InputUsername}
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="none"
								spellCheck={false}
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
						<FormGroup className="w-100">
							<Field
								component={SelectRole}
								className="w-100"
								name="role"
								id="role"
								onChange={handleChangeRole}
								value={formData.role}
							/>
							<FieldError name="role">
								Merci de renseigner un rôle.
							</FieldError>
						</FormGroup>
						<FormGroup className="">
							<Button
								type="submit"
								block
								color="primary"
							>
								Sign up
							</Button>
						</FormGroup>
					</CardBody>
				</Card>
			</Form>
			<small className="my-2">
				Already have an account? {' '}
				<Link to="/login">
					Log in
				</Link>
			</small>
		</div>
	);
};

export default PageSignUp;
