import { Provider } from "react-redux";
import { RouterApp } from "./router";
import { store } from "./store/store";

function App() {
	return (
		<>
			<Provider store={store}>
				<RouterApp />
			</Provider>
		</>
	);
}

export default App;
