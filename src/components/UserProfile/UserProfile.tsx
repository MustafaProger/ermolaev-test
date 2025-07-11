import { useEffect } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";
import "./UserProfile.scss";

import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../store/actions";
import type { RootState } from "../../store/store";

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<any>();
	const profile = useSelector((state: RootState) => state.profile);
	const loading = useSelector((state: RootState) => state.loading);
	const error = useSelector((state: RootState) => state.error);

	const { monthsInApp, meetings, roomers, avatar  } = profile || {};

	const {
		role,
		name,
		nickname,
		last_login_at,
		calling_limit,
		going_limit,
		city,
		telegram,
		about,
	} = profile?.data || {};

	useEffect(() => {
		dispatch(fetchProfile("5e800be0-088e-41cb-b549-10ebf4a13591"));
	}, [dispatch]);

	console.log("Profile data:", profile);

	if (!profile) {
		return (
			<div className='user-profile'>
				<div
					className='user-profile__container'
					style={{ textAlign: "center", padding: "50px" }}>
					<div style={{ fontSize: "18px", color: "#666" }}>
						Загрузка профиля...
					</div>
				</div>
			</div>
		);
	}

	let formattedLogin = "";

	try {
		const loginDate = last_login_at ? new Date(last_login_at) : null;

		if (!loginDate || isNaN(loginDate.getTime())) {
			formattedLogin = "недавно";
		} else if (isToday(loginDate)) {
			formattedLogin = `сегодня, ${format(loginDate, "HH:mm")}`;
		} else if (isYesterday(loginDate)) {
			formattedLogin = `вчера, ${format(loginDate, "HH:mm")}`;
		} else {
			formattedLogin = format(loginDate, "d MMMM yyyy, HH:mm", { locale: ru });
		}
	} catch (error) {
		console.error("Ошибка форматирования даты:", error);
		formattedLogin = "недавно";
	}

	if (loading) {
		return (
			<div className='user-profile'>
				<div className='user-profile__container'>
					<div style={{ textAlign: "center", padding: "50px" }}>
						<div style={{ fontSize: "18px", color: "#666" }}>
							Загрузка профиля...
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Показываем ошибку
	if (error) {
		return (
			<div className='user-profile'>
				<div className='user-profile__container'>
					<div style={{ textAlign: "center", padding: "50px" }}>
						<div style={{ fontSize: "18px", color: "#e74c3c" }}>{error}</div>
						<button
							onClick={() =>
								dispatch(fetchProfile("5e800be0-088e-41cb-b549-10ebf4a13591"))
							}
							style={{
								marginTop: "20px",
								padding: "10px 20px",
								backgroundColor: "#007bff",
								color: "white",
								border: "none",
								borderRadius: "5px",
								cursor: "pointer",
							}}>
							Попробовать снова
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='user-profile'>
			<div className='user-profile__container'>
				<ProfileHeaderPanel />
				<div className='user-profile__avatar-block'>
					<div className='user-profile__avatar-image'>
						<img
							src={avatar}
							alt={`Аватар пользователя ${name}`}
						/>
						<p
							className={`user-profile__role-badge user-profile__role-badge--${role}`}>
							{role ? roleForAvatar[role] || "?" : "?"}
						</p>
					</div>
				</div>

				<p className='user-profile__role-with-name'>
					<span className='user-profile__role-with-name-role'>
						{role ? roleForName[role] : "роль"}:
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
					<p className='user-profile__city'>
						{city?.name || "Город не указан"}
					</p>
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
					telegram={telegram || ""}
					bio={about || ""}
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
