import React from "react";
import "./ProfileCard.scss";

import type { ProfileCardProps } from "../../interface/interface";

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
							<span className='profile-card-list-icon'>
								<img
									src={String(item.icon)}
									alt=''
								/>
							</span>
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
