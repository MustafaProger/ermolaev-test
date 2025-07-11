export interface UserProfileData {
	data?: {
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
	};
	monthsInApp: string;
	meetings: number;
	roomers: number;
	avatar: string;
}

export interface CallsBlockProps {
	calls?: number;
	going?: number;
}

export interface ProfileCardItem {
	icon?: React.ReactNode;
	text: string;
	onClick?: () => void;
}

export interface ProfileCardProps {
	icon?: string;
	items?: ProfileCardItem[];
	children?: React.ReactNode;
	className?: string;
}

export interface ProfileBioCardProps {
	bio: string;
	telegram: string;
	onClick?: () => void;
}
