import { createStore, applyMiddleware } from "redux";
import type { UserProfileData } from "../interface/interface";
import avatar from "../assets/imgs/avatar.png";

interface LoadProfileAction {
	type: "LOAD_PROFILE";
	payload: UserProfileData;
}

interface SetLoadingAction {
	type: "SET_LOADING";
	payload: boolean;
}

interface SetErrorAction {
	type: "SET_ERROR";
	payload: string;
}

type Action = LoadProfileAction | SetLoadingAction | SetErrorAction;

interface AppState {
	profile: UserProfileData;
	loading: boolean;
	error: string | null;
}

const initialProfile: UserProfileData = {
	data: {
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
	},
	monthsInApp: "1 месяц",
	meetings: 15,
	roomers: 350,
	avatar: "sadf",
};

const initialState: AppState = {
	profile: initialProfile,
	loading: false,
	error: null,
};

function reducer(state = initialState, action: Action): AppState {
	switch (action.type) {
		case "LOAD_PROFILE":
			return {
				...state,
				profile: action.payload,
				loading: false,
				error: null,
			};
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const thunkMiddleware = (store: any) => (next: any) => (action: any) => {
	if (typeof action === "function") {
		return action(store.dispatch, store.getState);
	}
	return next(action);
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export type RootState = AppState;
export default store;
