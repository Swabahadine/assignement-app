import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
	Badge,
	Collapse,
	Container,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
} from 'reactstrap';
import { Button } from '@material-ui/core';
import { getAssignements } from '../apiRequests/assignements';
import AssignementAdd from '../components/assignement/Add';

const PageHome = () => {
	useQueryClient();
	const { data: assignements, isSuccess, refetch } = useQuery('getAssignements', getAssignements);
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(((prev) => !prev));
	};
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Application de gestion des Assignments</h3>
			<Button onClick={toggle} variant="contained" color="secondary">
				Ajouter devoir
			</Button>
			<Collapse className="w-100 mt-3" isOpen={isOpen}>
				<AssignementAdd afterSubmit={refetch} />
			</Collapse>
			<div className="my-4 w-100">
				<ListGroup>
					{ isSuccess && assignements.map(({
						_id,
						nom,
						rendu,
						dateDeRendu,
					}) => (
						<ListGroupItem key={_id} tag="a" action>
							<ListGroupItemHeading className="d-flex justify-content-between">
								<span>{nom}</span>
								{rendu && <Badge color="danger" pill>Rendu</Badge>}
							</ListGroupItemHeading>
							<ListGroupItemText>
								Date de rendu : {dateDeRendu}
							</ListGroupItemText>
						</ListGroupItem>
					))}
				</ListGroup>
			</div>
		</Container>
	);
};

export default PageHome;
