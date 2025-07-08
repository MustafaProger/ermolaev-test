import { createStore } from "redux";
import type { UserProfileData } from "../interface/interface";

const initialStore: UserProfileData = {
	data: {
		id: "5e800be0-088e-41cb-b549-10ebf4a13591",
		role: "roomer",
		name: "Полный Тестовый Пользователь",
		nickname: "user6",
		avatar_url: "https://example.com/avatar_publicuser.png",
		age: 32,
		city: {
			id: 1,
			name: "Кореновск",
		},
		is_private: false,
		telegram: "publicuser_telegram",
		about: "Публичный информационный тестовый пользователь",
		points: 10,
		calling_limit: 10,
		going_limit: 10,
		account_status: "active",
		last_login_at: "2025-07-07T12:29:21.65866Z",
		created_at: "2025-07-07T12:29:21.65866Z",
		updated_at: "2025-07-07T12:29:21.666905Z",
	},
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
