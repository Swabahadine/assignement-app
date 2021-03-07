import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
	Badge,
	Card,
	CardBody,
	CardHeader,
	Container,
} from 'reactstrap';
import { getOneAssignement } from '../apiRequests/assignements';

const PageAssignment = () => {
	const { id } = useParams();
	const {
		data: {
			nom,
			rendu,
			subject,
			dateDeRendu,
		},
		isSuccess,
	} = useQuery(['teacherGetOneAssignements', { id }], getOneAssignement, {
		initialData: { subject: {} },
	});
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Note</h3>
			{isSuccess && (
				<Card className="w-100">
					<CardHeader className="d-flex justify-content-between align_items-center">
						<span>{nom}</span>
						<div>
							{rendu ? (<Badge color="danger" pill>Rendu</Badge>)
								: (<Badge color="info" pill>Non Rendu</Badge>)}
						</div>

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

export default PageAssignment;
