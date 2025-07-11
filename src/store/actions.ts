import { api } from "../services/api";
import type { UserProfileData } from "../interface/interface";

export const loadProfile = (profile: UserProfileData) => ({
	type: "LOAD_PROFILE" as const,
	payload: profile,
});

export const setLoading = (loading: boolean) => ({
	type: "SET_LOADING" as const,
	payload: loading,
});

export const setError = (error: string) => ({
	type: "SET_ERROR" as const,
	payload: error,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchProfile = (uuid: string) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const profile = await api.getProfile(uuid);
		dispatch(loadProfile(profile));
	} catch (error) {
		dispatch(setError("Ошибка при загрузке профиля"));
		console.error("Error fetching profile:", error);
	}
};
