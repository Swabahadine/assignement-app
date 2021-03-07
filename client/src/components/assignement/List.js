import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Badge,
	Button,
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
import { Link } from 'react-router-dom';

const ListAssignmentGroup = ({ assignments }) => (
	<div className="w-100">
		<ListGroup>
			{ assignments.map(({
				_id,
				note,
				author,
				nom,
				rendu,
				subject,
				dateDeRendu,
			}) => (
				<ListGroupItem key={_id} tag={Link} to={`/assignment/${_id}`} action>
					<ListGroupItemHeading className="d-flex justify-content-between">
						<span>{nom}</span>
						{rendu && <Badge color="danger" pill>Rendu</Badge>}
					</ListGroupItemHeading>
					<ListGroupItemText>
						<div className="py-1">
							<b>Auteur (élève) :</b> {author}
						</div>
						<div className="py-1">
							<b>Matière :</b> {subject.name}
						</div>
						<div className="py-1">
							<b>Professeur :</b> {subject.teacher} <br />
						</div>
						<div className="py-1">
							<b>Date de rendu : </b>{dateDeRendu}
						</div>
						{note && (
							<div className="py-1">
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
					</ListGroupItemText>
					<div className="d-flex justify-content-end">
						<Button className="p-0" color="link">
							Voir plus
						</Button>
					</div>
				</ListGroupItem>
			))}
		</ListGroup>
	</div>
);

export const AssignmentList = ({ assignments }) => {
	const [activeTab, setActiveTab] = useState('1');
	return (
		<div className="w-100">
			<Nav tabs>
				<NavItem style={{ cursor: 'pointer' }}>
					<NavLink
						className={clsx({ active: activeTab === '1' })}
						onClick={() => { setActiveTab('1'); }}
					>
						Non rendus
					</NavLink>
				</NavItem>
				<NavItem style={{ cursor: 'pointer' }}>
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
					<ListAssignmentGroup assignments={assignments.filter(({ rendu }) => !rendu)} />
				</TabPane>
				<TabPane tabId="2">
					<ListAssignmentGroup assignments={assignments.filter(({ rendu }) => rendu)} />
				</TabPane>
			</TabContent>
		</div>
	);
};

ListAssignmentGroup.propTypes = {
	assignments: PropTypes.arrayOf(
		PropTypes.shape({
			rendu: PropTypes.bool,
		}),
	).isRequired,
};

AssignmentList.propTypes = {
	assignments: PropTypes.arrayOf(
		PropTypes.shape({
			rendu: PropTypes.bool,
		}),
	).isRequired,
};
