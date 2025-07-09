import "./App.css";
import UserProfile from "./components/UserProfile/UserProfile";

import { Provider } from "react-redux";
import store from "./store/store";

function App() {
	return (
		<Provider store={store}>
			<div className='container'>
				<UserProfile />
			</div>
		</Provider>
	);
}

export default App;
