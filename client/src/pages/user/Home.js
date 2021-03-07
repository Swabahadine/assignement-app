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
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from 'reactstrap';
import { Button } from '@material-ui/core';
// import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { getAssignements } from '../../apiRequests/assignements';
import AssignementAdd from '../../components/assignement/Add';

const PageUserHome = () => {
	useQueryClient();
	const { data: assignements, isSuccess, refetch } = useQuery('getAssignements', getAssignements);
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('1');
	const toggle = () => {
		setIsOpen(((prev) => !prev));
	};
	return (
		<Container className="d-flex flex-column justify-content-start align-items-start">
			<h3 className="py-4">Application de gestion des Assignments</h3>
			<div className="mb-4 w-100">
				<Button onClick={toggle} variant="contained" color="primary">
					Ajouter devoir
				</Button>
				<Collapse className="w-100 mt-3 mb-2" isOpen={isOpen}>
					<AssignementAdd afterSubmit={refetch} />
				</Collapse>
			</div>
			<div className="w-100">
				<Nav tabs>
					<NavItem>
						<NavLink
							className={clsx({ active: activeTab === '1' })}
							onClick={() => { setActiveTab('1'); }}
						>
							Non rendus
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={clsx({ active: activeTab === '2' })}
							onClick={() => { setActiveTab('2'); }}
						>
							Rendus
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="1">
						<div className="w-100">
							<ListGroup>
								{ isSuccess && assignements.filter(({ rendu }) => !rendu).map(({
									_id,
									nom,
									rendu,
									subject,
									dateDeRendu,
								}) => (
									<ListGroupItem key={_id} tag="a" action>
										<ListGroupItemHeading className="d-flex justify-content-between">
											<span>{nom}</span>
											{rendu && <Badge color="danger" pill>Rendu</Badge>}
										</ListGroupItemHeading>
										<ListGroupItemText>
											<span>
												Matière: {subject.name} <br />
												Professeur: {subject.teacher} <br />
											</span>
											Date de rendu : {dateDeRendu}
										</ListGroupItemText>
									</ListGroupItem>
								))}
							</ListGroup>
						</div>
					</TabPane>
					<TabPane tabId="2">
						<div className="w-100">
							<ListGroup>
								{ isSuccess && assignements.filter(({ rendu }) => rendu).map(({
									_id,
									nom,
									rendu,
									subject,
									dateDeRendu,
								}) => (
									<ListGroupItem key={_id} tag="a" action>
										<ListGroupItemHeading className="d-flex justify-content-between">
											<span>{nom}</span>
											{rendu && <Badge color="danger" pill>Rendu</Badge>}
										</ListGroupItemHeading>
										<ListGroupItemText>
											<span>
												Matière: {subject.name} <br />
												Professeur: {subject.teacher} <br />
											</span>
											Date de rendu : {dateDeRendu}
										</ListGroupItemText>
									</ListGroupItem>
								))}
							</ListGroup>
						</div>
					</TabPane>
				</TabContent>
			</div>
		</Container>
	);
};

export default PageUserHome;
