import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
	Badge,
	Card,
	CardBody,
	CardHeader,
	Collapse,
	Container,
} from 'reactstrap';
import { getOneAssignement } from '../apiRequests/assignements';
import AssignementFormNotation from '../components/assignement/FormNotation';
import { USER_ROLE } from '../lib/api/enums';
import { getUser } from '../lib/localstorage/userStorage';

const PageAssignment = () => {
	const { id } = useParams();
	const user = getUser();
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(((prev) => !prev));
	};
	const isTeacher = user.role === USER_ROLE.TEACHER;
	const {
		data: {
			author,
			nom,
			rendu,
			subject,
			note,
			report,
			dateDeRendu,
		},
		isSuccess,
		refetch,
	} = useQuery(['teacherGetOneAssignements', { id }], getOneAssignement, {
		initialData: { subject: {} },
	});
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Note</h3>
			{isTeacher && !note && (
				<div className="mb-4 w-100">
					<Button onClick={toggle} variant="contained" color="primary">
						Noter le devoir
					</Button>
					<Collapse className="w-100 mt-3 mb-2" isOpen={isOpen}>
						<AssignementFormNotation id={id} afterSubmit={refetch} />
					</Collapse>
				</div>
			)}
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
						<div className="py-2">
							<b>Auteur (élève) :</b> {author}
						</div>
						<div className="py-2">
							<b>Matière :</b> {subject.name}
						</div>
						<div className="py-2">
							<b>Professeur :</b> {subject.teacher} <br />
						</div>
						<div className="py-2">
							<b>Date de rendu : </b>{dateDeRendu}
						</div>
						{note && (
							<div className="py-2">
								<b>Note : </b>
								<span className={clsx({
									'text-danger': note < 10,
									'text-success font-weight-bold': note >= 10,
								})}
								>
									{note} / 20
								</span>
							</div>
						)}
						{report && (
							<div className="py-2">
								<b>Commentaire :</b> {report}
							</div>
						)}
					</CardBody>
				</Card>
			)}

		</Container>
	);
};

export default PageAssignment;
