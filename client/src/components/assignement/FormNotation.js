import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, FieldError } from 'react-jsonschema-form-validation';
import {
	FormGroup, Input, UncontrolledAlert,
} from 'reactstrap';
import { Button } from '@material-ui/core';
import { useMutation } from 'react-query';
import { putNotationOneAssignement } from '../../apiRequests/assignements';

const initData = {
	note: '',
	report: '',
};

const schema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		note: { type: 'number', minimum: 0, maximum: 20 },
		report: { type: 'string' },
	},
	required: ['note'],
};

const AssignementFormNotation = ({ id, afterSubmit }) => {
	const [formData, setFormData] = useState(initData);

	const { mutate: mutateNotation, isSuccess } = useMutation(putNotationOneAssignement, {
		onSuccess: () => {
			setFormData(initData);
			afterSubmit();
		},
	});

	const handleChange = (newData) => {
		setFormData(newData);
	};

	const handleSubmit = async () => {
		await mutateNotation({ ...formData, id });
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
					Le devoir a bien été noté !
				</UncontrolledAlert>
			)}
			<FormGroup>
				<Field
					component={Input}
					id="note"
					name="note"
					type="number"
					placeholder="Note en 0 et 20"
					value={formData.note}
				/>
				<FieldError name="note">
					Merci de mettre une note en 0 et 20.
				</FieldError>
			</FormGroup>
			<FormGroup>
				<Field
					component={Input}
					id="report"
					name="report"
					type="textarea"
					placeholder="Vos commentaires ..."
					value={formData.report}
				/>
				<FieldError name="report" />
			</FormGroup>
			<Button type="submit" variant="contained">
				Valider
			</Button>
		</Form>
	);
};

AssignementFormNotation.propTypes = {
	afterSubmit: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};
export default AssignementFormNotation;
