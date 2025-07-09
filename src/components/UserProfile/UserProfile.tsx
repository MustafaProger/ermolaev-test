import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";
import "./UserProfile.scss";

import { useSelector } from "react-redux";

import settings from "../../assets/icons/settings.svg";
import ProfileHeaderPanel from "../ProfileHeaderPanel/ProfileHeaderPanel";
import type { RootState } from "../../store/store";

const roleForAvatar: Record<string, string> = {
	roomer: "Р",
	groomer: "Г",
};

const roleForName: { [key: string]: string } = {
	roomer: "румер",
	groomer: "грумер",
};

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
	} = useSelector((state: RootState) => state);

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
			<ProfileHeaderPanel />
			<div className='user-profile__container'>
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
			</div>
		</div>
	);
};

export default UserProfile;
