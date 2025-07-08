import "./UserProfile.scss";

import type { UserProfileData } from "../../interface/interface";
import { connect } from "react-redux";

const UserProfile = (props: UserProfileData) => {
	console.log(props);
	return <div className='user-profile'>UserProfile</div>;
};

const mapStateToProps = (state: UserProfileData): UserProfileData => {
	return state;
};

export default connect(mapStateToProps)(UserProfile);
