import { useQuery, useQueryClient } from 'react-query';
import {
	Container,
} from 'reactstrap';
import { getAssignements } from '../../apiRequests/assignements';
import { AssignmentList } from '../../components/assignement/List';

const PageAdminHome = () => {
	useQueryClient();
	const { data: assignments, isSuccess } = useQuery('adminGgetAssignements', getAssignements);
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Assignement app</h3>
			{isSuccess && assignments && (
				<AssignmentList assignments={assignments} />
			)}
		</Container>
	);
};

export default PageAdminHome;
