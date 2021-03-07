import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, FieldError } from 'react-jsonschema-form-validation';
import {
	Button, FormGroup, Input, UncontrolledAlert,
} from 'reactstrap';
import { useMutation } from 'react-query';
import { postSubject } from '../../apiRequests/subject';
import { SelectTeacher } from '../select/Teacher';

const initData = {
	name: '',
	teacher: '',
};

const schema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		name: { type: 'string' },
		teacher: {
			type: 'object',
			additionalProperties: false,
			properties: {
				label: { type: 'string' },
				value: { type: 'string' },
			},
			required: ['label', 'value'],
		},
	},
	required: ['name', 'teacher'],
};

const SubjectAdd = ({ afterSubmit }) => {
	const [formData, setFormData] = useState(initData);

	const { mutate: mutateAdd, isSuccess, isError, error } = useMutation(postSubject, {
		onSuccess: () => {
			setFormData(initData);
			afterSubmit();
		},
	});
	const handleChange = (newData) => {
		setFormData(newData);
	};
	const handleChangeTeacher = (newData) => {
		setFormData((prev) => ({ ...prev, teacher: newData }));
	};
	const handleSubmit = async () => {
		const { teacher } = formData;
		await mutateAdd({ ...formData, teacher: teacher.label, teacherId: teacher.value });
	};
	return (
		<Form
			className="SubjectAdd w-100 d-flex flex-column"
			data={formData}
			schema={schema}
			onChange={handleChange}
			onSubmit={handleSubmit}
		>
			{isSuccess && (
				<UncontrolledAlert color="success">
					La matière a créée avec succès.
				</UncontrolledAlert>
			)}
			{isError && (
				<UncontrolledAlert color="danger">
					{error.message}
				</UncontrolledAlert>
			)}
			<FormGroup>
				<Field
					component={Input}
					id="name"
					name="name"
					placeholder="Nom"
					value={formData.name}
				/>
				<FieldError name="name">
					Merci de renseigner le nom de la matière.
				</FieldError>
			</FormGroup>
			<FormGroup>
				<Field
					component={SelectTeacher}
					id="teacher"
					name="teacher"
					placeholder="Teacher"
					onChange={handleChangeTeacher}
					value={formData.teacher}
				/>
				<FieldError name="teacher">
					Merci de selectionner le professeur.
				</FieldError>
			</FormGroup>
			<Button type="submit" color="dark">
				Valider
			</Button>
		</Form>
	);
};

SubjectAdd.propTypes = {
	afterSubmit: PropTypes.func.isRequired,
};
export default SubjectAdd;
