import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";
import "./UserProfile.scss";

import { useSelector } from "react-redux";
import type { UserProfileData } from "../../interface/interface";

import settings from "../../assets/icons/settings.svg";
import ProfileHeaderPanel from "../ProfileHeaderPanel/ProfileHeaderPanel";
import CallsBlock from "../CallsBlock/CallsBlock";
import ProfileCard from "../ProfileCard/ProfileCard";

import HistoryIcon from "../../assets/icons/history.svg";
import EyeIcon from "../../assets/icons/eye.svg";
import AdultIcon from "../../assets/icons/adult.svg";
import CheckIcon from "../../assets/icons/check.svg";
import BlockIcon from "../../assets/icons/block.svg";
import BookmarkIcon from "../../assets/icons/bookmark.svg";
import LogoutIcon from "../../assets/icons/logout.svg";

import ProfileBioCard from "../ProfileBioCard/ProfileBioCard";

const roleForAvatar: Record<string, string> = {
	roomer: "Р",
	groomer: "Г",
};

const roleForName: { [key: string]: string } = {
	roomer: "румер",
	groomer: "грумер",
};

const DotIcon = () => (
	<span
		style={{
			width: 10,
			height: 10,
			minWidth: 10,
			minHeight: 10,
			borderRadius: "50%",
			backgroundColor: "#ccc",
			display: "inline-block",
			verticalAlign: "middle",
			marginTop: 1,
		}}
	/>
);

const UserProfile = () => {
	const {
		avatar_url,
		role,
		name,
		nickname,
		last_login_at,
		monthsInApp,
		meetings,
		roomers,
		city,
		calling_limit,
		going_limit,
		telegram,
		about,
	} = useSelector((state: UserProfileData) => state);

	const loginDate = new Date(last_login_at);
	let formattedLogin = "";

	if (isToday(loginDate)) {
		formattedLogin = `сегодня, ${format(loginDate, "HH:mm")}`;
	} else if (isYesterday(loginDate)) {
		formattedLogin = `вчера, ${format(loginDate, "HH:mm")}`;
	} else {
		formattedLogin = format(loginDate, "d MMMM yyyy, HH:mm", { locale: ru });
	}

	return (
		<div className='user-profile'>
			<div className='user-profile__container'>
				<ProfileHeaderPanel />
				<div className='user-profile__avatar-block'>
					<div className='user-profile__avatar-image'>
						<img
							src={avatar_url}
							alt={`Аватар пользователя ${name}`}
						/>
						<p
							className={`user-profile__role-badge user-profile__role-badge--${role}`}>
							{roleForAvatar[role] || "?"}
						</p>
					</div>
				</div>

				<p className='user-profile__role-with-name'>
					<span className='user-profile__role-with-name-role'>
						{roleForName[role]}:
					</span>{" "}
					<span className='user-profile__role-with-name-name'>{name}</span>
				</p>

				<div className='user-profile__meta'>
					<p className='user-profile__nickname'>@{nickname}</p>
					<p className='user-profile__last-login'>{formattedLogin}</p>
				</div>

				<div className='user-profile__stats'>
					<div className='user-profile__stat user-profile__stat--in-app'>
						<p className='user-profile__stat-value'>{monthsInApp}</p>
						<p className='user-profile__stat-label'>в игруме</p>
					</div>
					<div className='user-profile__stat user-profile__stat--meetings'>
						<p className='user-profile__stat-value'>{meetings}</p>
						<p className='user-profile__stat-label'>встреч</p>
					</div>
					<div className='user-profile__stat user-profile__stat--roomers'>
						<p className='user-profile__stat-value'>{roomers}</p>
						<p className='user-profile__stat-label'>румеров</p>
					</div>
				</div>

				<div className='user-profile__footer'>
					<p className='user-profile__city'>{city.name}</p>
					<button className='user-profile__settings'>
						<img
							src={settings}
							alt='Настройки профиля'
						/>
						<span>РЕДАКТ</span>
					</button>
				</div>

				<CallsBlock
					calls={calling_limit}
					going={going_limit}
				/>

				<div className='profile-card'>
					<div className='profile-card-list-item'>
						<span className='profile-card-list-icon'>
							<img
								src={HistoryIcon}
								alt='История'
							/>
						</span>
						<span className='profile-card-title'>ИСТОРИЯ ВСТРЕЧ</span>
					</div>
				</div>

				<ProfileCard
					items={[
						{
							icon: EyeIcon,
							text: "Публичный аккаунт",
						},
						{
							icon: AdultIcon,
							text: "Взрослый",
						},
					]}
				/>

				<ProfileCard
					items={[
						{ icon: CheckIcon, text: "Мои подписки" },
						{ icon: BlockIcon, text: "Чёрный список" },
						{ icon: BookmarkIcon, text: "Закладки" },
					]}
				/>

				<ProfileBioCard
					telegram={telegram}
					bio={about}
				/>

				<ProfileCard
					items={[
						{ icon: <DotIcon />, text: "Возможновти ИГРУМА" },
						{ icon: <DotIcon />, text: "Правила ИГРУМА" },
						{ icon: <DotIcon />, text: "Инструкция РУМЕРА" },
						{ icon: <DotIcon />, text: "Инструкция МАСТЕРА" },
						{ icon: <DotIcon />, text: "Инструкция МЕСТА" },
						{ icon: <DotIcon />, text: "Пользовательское соглашение" },
					]}
				/>

				<div className='profile-card'>
					<div className='profile-card-list-item'>
						<span className='profile-card-list-icon'>
							<img
								src={LogoutIcon}
								alt='выход'
							/>
						</span>
						<span className='profile-card-title'>Выйти из профиля</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
