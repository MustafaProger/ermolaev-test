import { createStore } from "redux";
import type { UserProfileData } from "../interface/interface";
import avatar from "../assets/imgs/avatar.png";

const initialStore: UserProfileData = {
	id: "5e800be0-088e-41cb-b549-10ebf4a13591",
	role: "roomer",
	name: "Ваня Петькин",
	nickname: "user6",
	avatar_url: avatar,
	age: 32,
	city: {
		id: 1,
		name: "Кореновск",
	},
	is_private: false,
	telegram: "publicuser_telegram",
	about:
		"Публичный информационный тестовый пользователь Публичный информационный тестовый пользователь Публичный информационный тестовый пользователь Публичный информационный тестовый пользователь Публичный информационный тестовый пользователь Публичный информационный тестовый пользователь Публичный информационный тестовый пользователь ",
	points: 10,
	calling_limit: 2,
	going_limit: 3,
	account_status: "active",
	last_login_at: "2025-07-07T12:29:21.65866Z",
	created_at: "2025-07-07T12:29:21.65866Z",
	updated_at: "2025-07-07T12:29:21.666905Z",

	monthsInApp: "1 месяц",
	meetings: 15,
	roomers: 350,
};

function reducer(state = initialStore, action: { type: string }) {
	switch (action.type) {
		case "sadfs":
			return { ...state };
		default:
			return state;
	}
}

const store = createStore(reducer);

export default store;
