import "./ProfileHeaderPanel.scss";

import send from "../../assets/icons/send.svg";
import thiss from "../../assets/icons/thiss.svg";
import cotum from "../../assets/icons/cotum.svg";
import back from "../../assets/icons/back.svg";

const ProfileHeaderPanel = () => {
	return (
		<div className='profile-header-panel'>
			<button className='profile-header-panel__logout'>
				<img
					src={back}
					alt=''
				/>
			</button>

			<div className='profile-header-panel__actions'>
				<button className='profile-header-panel__button'>
					<img
						src={send}
						alt=''
					/>
				</button>

				<div className='profile-header-panel__button'>
					<img
						src={thiss}
						alt=''
					/>
				</div>

				<button className='profile-header-panel__button'>
					<img
						src={cotum}
						alt=''
					/>
				</button>
			</div>
		</div>
	);
};

export default ProfileHeaderPanel;
