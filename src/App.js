import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Pages/Auth";
import Main from "./components/Pages/Main";
import Profile from "./components/Pages/Profile";
import { GlobalContextProvider } from "./components/Context/gobalContext";
function App() {
	return (
		<BrowserRouter>
			<GlobalContextProvider>
				<Routes>
					<Route path="/" element={<Auth />} />
					
					<Route path="/profile" element={<Profile />} />
					<Route path="/main" element={<Main />} />
				</Routes>
			</GlobalContextProvider>
		</BrowserRouter>
	);
}

export default App;
