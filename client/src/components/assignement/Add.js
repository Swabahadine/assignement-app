import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, FieldError } from 'react-jsonschema-form-validation';
import {
	FormGroup, Input, Label, UncontrolledAlert,
} from 'reactstrap';
import { Button } from '@material-ui/core';
import CarbonDatePicker from 'react-carbon-datepicker';
import { useMutation } from 'react-query';
import { postAssignements } from '../../apiRequests/assignements';
import { SelectSubject } from '../select/Subject';

const initData = {
	nom: '',
	dateDeRendu: Date.now(),
	subject: '',
};

const schema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		nom: { type: 'string' },
		dateDeRendu: { type: 'number' },
		subject: {
			type: 'object',
			additionalProperties: false,
			properties: {
				label: { type: 'string' },
				value: { type: 'string' },
			},
			required: ['label', 'value'],
		},
	},
	required: ['nom', 'dateDeRendu', 'subject'],
};

const AssignementAdd = ({ afterSubmit }) => {
	const [formData, setFormData] = useState(initData);

	const { mutate: mutateAdd, isSuccess } = useMutation(postAssignements, {
		onSuccess: () => {
			setFormData(initData);
			afterSubmit();
		},
	});

	const handleChange = (newData) => {
		setFormData(newData);
	};
	const handleChangeSubject = (newData) => {
		setFormData((prev) => ({ ...prev, subject: newData }));
	};
	const handleDateChange = (newData) => {
		setFormData((prev) => ({ ...prev, dateDeRendu: newData }));
	};

	const handleSubmit = async () => {
		const dateDeRendu = new Date(formData.dateDeRendu);
		const subject = formData.subject.value;
		await mutateAdd({ ...formData, dateDeRendu, subject });
	};
	return (
		<Form
			className="AssignementAdd w-100 d-flex flex-column"
			data={formData}
			schema={schema}
			onChange={handleChange}
			onSubmit={handleSubmit}
		>
			{isSuccess && (
				<UncontrolledAlert color="success">
					Le devoir a bien été ajouté !
				</UncontrolledAlert>
			)}
			<FormGroup>
				<Field
					component={SelectSubject}
					id="subject"
					name="subject"
					placeholder="Choose a subject"
					onChange={handleChangeSubject}
					value={formData.subject}
				/>
				<FieldError name="subject">
					Merci de selectionner le professeur.
				</FieldError>
			</FormGroup>
			<FormGroup>
				<Field
					component={Input}
					id="nom"
					name="nom"
					placeholder="Nom"
					value={formData.nom}
				/>
				<FieldError name="nom">
					Merci de renseigner le nom du devoir.
				</FieldError>
			</FormGroup>
			<FormGroup>
				<div className="d-flex justify-content-between align-items-center">
					<Label className="d-flex align-items-center">
						Date de rendu
					</Label>
					<Field
						component={CarbonDatePicker}
						id="dateDeRendu"
						name="dateDeRendu"
						placeholder="dateDeRendu"
						onChange={handleDateChange}
						value={formData.dateDeRendu}
					/>
				</div>
				<FieldError name="dateDeRendu">
					Merci de renseigner la date de rendu.
				</FieldError>
			</FormGroup>
			<Button type="submit" variant="contained">
				Valider
			</Button>
		</Form>
	);
};

AssignementAdd.propTypes = {
	afterSubmit: PropTypes.func.isRequired,
};
export default AssignementAdd;
