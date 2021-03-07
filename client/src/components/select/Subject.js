import { useState } from 'react';
import { useQuery } from 'react-query';
import Select from 'react-select';
import { getSubjects } from '../../apiRequests/subject';

export const SelectSubject = ({ ...props }) => {
	const [options, setOptions] = useState([]);
	const { isError, error } = useQuery('getSubjects', getSubjects, {
		onSuccess: (subjects) => {
			setOptions(subjects.map(({ _id, name, teacher }) => ({
				label: `${name} - ${teacher}`,
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
