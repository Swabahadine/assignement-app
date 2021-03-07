import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { clearAuth } from '../../lib/authentication';
import { getUser } from '../../lib/localstorage/userStorage';
import { USER_ROLE } from '../../lib/api/enums';

const LeftSidebar = ({ children, className, ...props }) => {
	const { username, role } = getUser();
	return (
		<div style={{ overflowY: 'auto' }} {...props} className={clsx(className, 'min-vh-100 vw-100 d-flex')}>
			<Nav
				vertical
				className={clsx('vh-100 bg-dark py-4')}
				style={{
					width: 200,
					left: 0,
				}}
			>
				<small className="py-4 text-info justify-content-center w-100 d-flex">
					{username?.toUpperCase()} : {role}
				</small>
				<NavItem className="text-center w-100 py-2">
					<NavLink className="text-light" to="/home"><span>Assignements</span></NavLink>
				</NavItem>
				{role === USER_ROLE.ADMIN && (
					<NavItem className="text-center w-100 py-2">
						<NavLink className="text-light" to="/subjects"><span>Subjects</span></NavLink>
					</NavItem>
				)}
				<NavItem className="text-center w-100 py-2">
					<NavLink className="text-light" onClick={clearAuth} to="/login"><span>Log out</span></NavLink>
				</NavItem>
			</Nav>
			<div style={{ overflowY: 'auto' }} className="vh-100 vw-100 bg-light">
				{children}
			</div>
		</div>
	);
};

LeftSidebar.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};
LeftSidebar.defaultProps = {
	children: null,
	className: '',
};

export default LeftSidebar;
