import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { clearAuth } from '../../lib/authentication';

const LeftSidebar = ({ children, className, ...props }) => (
	<div style={{ overflowY: 'auto' }} {...props} className={clsx(className, 'min-vh-100 vw-100 d-flex')}>
		<Nav
			vertical
			className={clsx('vh-100 bg-dark py-4')}
			style={{
				width: 100,
				left: 0,
			}}
		>
			<NavItem className="text-center w-100 py-2">
				<NavLink className="text-light" to="/home"><small>Assignements</small></NavLink>
			</NavItem>
			<NavItem className="text-center w-100 py-2">
				<NavLink className="text-light" onClick={clearAuth} to="/login"><small>Log out</small></NavLink>
			</NavItem>
		</Nav>
		<div style={{ overflowY: 'auto' }} className="vh-100 vw-100 bg-light">
			{children}
		</div>
	</div>
);

LeftSidebar.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};
LeftSidebar.defaultProps = {
	children: null,
	className: '',
};

export default LeftSidebar;
