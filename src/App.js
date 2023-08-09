import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Pages/Auth";
import Main from "./components/Pages/Main";
import Profile from "./components/Pages/Profile";
import ForgotPassword from "./components/Pages/ForgotPassword";
import UpdatePassword from "./components/Pages/UpdatePassword";
import { GlobalContextProvider } from "./components/Context/gobalContext";
function App() {
	return (
		<BrowserRouter>
			<GlobalContextProvider>
				<Routes>
					<Route path="/" element={<Auth />} />
					<Route path = "/forgotPassword" element={<ForgotPassword/>}/>
					<Route path="/profile" element={<Profile />} />
					<Route path="/main" element={<Main />} />
					<Route path="/updatePassword/:id" element={<UpdatePassword/>} />
				</Routes>
			</GlobalContextProvider>
		</BrowserRouter>
	);
}

export default App;
