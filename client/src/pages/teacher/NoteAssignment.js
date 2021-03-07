import { useQuery } from 'react-query';
import {
	Card,
	CardBody,
	CardHeader,
	Container,
} from 'reactstrap';
import { getOneAssignement } from '../../apiRequests/assignements';

const PageNoteAssignment = () => {
	const {
		data: {
			nom,
			// rendu,
			subject,
			dateDeRendu,
		},
		isSuccess,
	} = useQuery(['teacherGetOneAssignements', { id: 5 }], getOneAssignement, {
		initialData: { subject: {} },
	});
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Note</h3>
			{isSuccess && (
				<Card>
					<CardHeader className="d-flex justify-content-between">
						<span>{nom}</span>
					</CardHeader>
					<CardBody>
						<span>
							Matière: {subject.name} <br />
							Professeur: {subject.teacher} <br />
						</span>
						Date de rendu : {dateDeRendu}
					</CardBody>
				</Card>
			)}

		</Container>
	);
};

export default PageNoteAssignment;
