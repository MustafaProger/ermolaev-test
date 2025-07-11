import axios from "axios";
import type { UserProfileData } from "../interface/interface";

import avatar from "../assets/imgs/avatar.png";

const API_BASE_URL = "/api";

export interface ApiProfileResponse {
	id: string;
	role: string;
	name: string;
	nickname: string;
	avatar_url: string;
	age: number;
	city: {
		id: number;
		name: string;
	};
	is_private: boolean;
	telegram: string;
	about: string;
	points: number;
	calling_limit: number;
	going_limit: number;
	account_status: string;
	last_login_at: string;
	created_at: string;
	updated_at: string;
}

export const api = {
	async getProfile(uuid: string): Promise<UserProfileData> {
		try {
			const response = await axios.get<ApiProfileResponse>(
				`${API_BASE_URL}/profile/${uuid}`,
				{
					headers: {
						accept: "application/json",
					},
					timeout: 10000,
				}
			);

			const profileData: UserProfileData = {
				...response.data,
				monthsInApp: "1 месяц",
				meetings: 15,
				roomers: 350,
				avatar: avatar,
			};

			return profileData;
		} catch (error) {
			console.error("Error fetching profile:", error);

			if (axios.isAxiosError(error)) {
				if (error.code === "ECONNABORTED") {
					throw new Error("Превышено время ожидания запроса");
				}
				if (error.response?.status === 404) {
					throw new Error("Профиль не найден");
				}
				if (error.response?.status && error.response.status >= 500) {
					throw new Error("Ошибка сервера");
				}
			}

			return getMockProfileData();
		}
	},
};

function getMockProfileData(): UserProfileData {
	return {
		data: {
			id: "5e800be0-088e-41cb-b549-10ebf4a13591",
			role: "roomer",
			name: "Ваня Петькин",
			nickname: "user6",
			avatar_url: "/src/assets/imgs/avatar.png",
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
			updated_at: "2025-07-07T12:666905Z",
		},
		monthsInApp: "1 месяц",
		meetings: 15,
		roomers: 350,
		avatar: avatar,
	};
}
