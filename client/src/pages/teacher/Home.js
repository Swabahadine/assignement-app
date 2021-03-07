import { useQuery, useQueryClient } from 'react-query';
import {
	Container,
} from 'reactstrap';
import { getAssignements } from '../../apiRequests/assignements';
import { AssignmentList } from '../../components/assignement/List';

const PageTeacherHome = () => {
	useQueryClient();
	const { data: assignments, isSuccess } = useQuery('getAssignements', getAssignements);
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Application de gestion des Assignments</h3>
			{isSuccess && assignments && (
				<AssignmentList assignments={assignments} />
			)}
		</Container>
	);
};

export default PageTeacherHome;
