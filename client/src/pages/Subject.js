import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
	Collapse,
	Container,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
} from 'reactstrap';
import { Button } from '@material-ui/core';
import { getSubjects } from '../apiRequests/subject';
import SubjectAdd from '../components/subject/Add';

const PageSubject = () => {
	useQueryClient();
	const { data: subject, isSuccess, refetch } = useQuery('getSubjects', getSubjects);
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(((prev) => !prev));
	};
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Les matières</h3>
			<Button onClick={toggle} variant="contained" color="primary">
				New subject
			</Button>
			<Collapse className="w-100 mt-3 mb-2" isOpen={isOpen}>
				<SubjectAdd afterSubmit={refetch} />
			</Collapse>
			<div className="my-4 w-100">
				<ListGroup>
					{ isSuccess && subject.map(({
						_id,
						name,
						teacher,
					}) => (
						<ListGroupItem key={_id} tag="a" action>
							<ListGroupItemHeading className="d-flex justify-content-between">
								<span>{name}</span>
							</ListGroupItemHeading>
							<ListGroupItemText>
								Teacher : {teacher}
							</ListGroupItemText>
						</ListGroupItem>
					))}
				</ListGroup>
			</div>
		</Container>
	);
};

export default PageSubject;
