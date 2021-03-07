import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
	Collapse,
	Container,
} from 'reactstrap';
import { Button } from '@material-ui/core';

import { getAssignements } from '../../apiRequests/assignements';
import AssignementAdd from '../../components/assignement/Add';
import { AssignmentList } from '../../components/assignement/List';

const PageHome = () => {
	useQueryClient();
	const { data: assignments, isSuccess, refetch } = useQuery('userGetAssignements', getAssignements);
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(((prev) => !prev));
	};
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Assignement app</h3>
			<div className="mb-4 w-100">
				<Button onClick={toggle} variant="contained" color="primary">
					Ajouter devoir
				</Button>
				<Collapse className="w-100 mt-3 mb-2" isOpen={isOpen}>
					<AssignementAdd afterSubmit={refetch} />
				</Collapse>
			</div>
			{isSuccess && assignments && (
				<AssignmentList assignments={assignments} />
			)}
		</Container>
	);
};

export default PageHome;
