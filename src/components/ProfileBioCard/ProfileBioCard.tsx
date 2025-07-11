import React, { useState } from "react";
import "./ProfileBioCard.scss";
import ArrowIcon from "../../assets/icons/arrow.svg";
import type { ProfileBioCardProps } from "../../interface/interface";

const ProfileBioCard: React.FC<ProfileBioCardProps> = ({
	bio,
	telegram,
	onClick,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => setIsExpanded((prev) => !prev);

	return (
		<div
			className='profile-bio-card'
			onClick={onClick}>
			<div
				className='profile-bio-card__top'
				onClick={toggleExpand}>
				<p className={`profile-bio-card__bio ${isExpanded ? "expanded" : ""}`}>
					{bio}
				</p>
				<img
					src={ArrowIcon}
					alt='Подробнее'
					className={`profile-bio-card__arrow ${isExpanded ? "rotated" : ""}`}
				/>
			</div>
			<hr className='profile-bio-card__divider' />
			<div className='profile-bio-card__bottom'>
				<span className='profile-bio-card__label'>Мой телеграм</span>
				<span className='profile-bio-card__telegram'>@{telegram}</span>
			</div>
		</div>
	);
};

export default ProfileBioCard;
