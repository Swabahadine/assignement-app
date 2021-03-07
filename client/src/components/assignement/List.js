import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Badge,
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

export const AssignmentList = ({ assignments }) => {
	const [activeTab, setActiveTab] = useState('1');
	return (
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
							{ assignments.filter(({ rendu }) => !rendu).map(({
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
							{ assignments.filter(({ rendu }) => rendu).map(({
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
	);
};

AssignmentList.propTypes = {
	assignments: PropTypes.arrayOf(
		PropTypes.shape({
			rendu: PropTypes.bool,
		}),
	).isRequired,
};
