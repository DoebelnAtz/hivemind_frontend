import React, { useContext } from 'react';
import { NavItemDiv, NavTitle, NavIcon } from './Styles';
import { CurrentNavContext } from '../../../Context/CurrentNavContext';
import { useHistory } from 'react-router';

type NavItemProps = {
	icon: string;
	title: string;
	link: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, title, link }) => {
	const { state: currentNav } = useContext(CurrentNavContext);
	const history = useHistory();
	return (
		<NavItemDiv
			selected={currentNav === title}
			onClick={() => history.push(`${link}`)}
		>
			<NavIcon src={icon} alt={`${title} icon`} />
			<NavTitle>{title}</NavTitle>
		</NavItemDiv>
	);
};

export default NavItem;
