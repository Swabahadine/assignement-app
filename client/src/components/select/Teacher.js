import { useState } from 'react';
import { useQuery } from 'react-query';
import Select from 'react-select';
import { getTeachers } from '../../apiRequests/user';

export const SelectTeacher = ({ ...props }) => {
	const [options, setOptions] = useState([]);
	const { isError, error } = useQuery('getTeachers', getTeachers, {
		onSuccess: (teachers) => {
			setOptions(teachers.map(({ _id, username }) => ({
				label: username,
				value: _id,
			})));
		},
	});
	return (
		<>
			{isError && (
				<small className="py-2 text-danger">{error.message}</small>
			)}
			<Select {...props} options={options} />
		</>
	);
};
