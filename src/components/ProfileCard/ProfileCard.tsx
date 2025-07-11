import React from "react";
import "./ProfileCard.scss";

interface ProfileCardItem {
	icon?: React.ReactNode;
	text: string;
	onClick?: () => void;
}

interface ProfileCardProps {
	icon?: React.ReactNode;
	items?: ProfileCardItem[];
	children?: React.ReactNode;
	className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
	items,
	children,
	className = "",
}) => (
	<div className={`profile-card ${className}`.trim()}>
		{items && (
			<div className='profile-card-list'>
				{items.map((item, idx) => (
					<div
						className='profile-card-list-item'
						key={`${item.text}-${idx}`}
						onClick={item.onClick}>
						{item.icon && (
							<span className='profile-card-list-icon'>{item.icon}</span>
						)}
						<span>{item.text}</span>
					</div>
				))}
			</div>
		)}
		{children}
	</div>
);

export default ProfileCard;
