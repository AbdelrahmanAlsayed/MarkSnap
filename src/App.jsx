import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import ForgotPassword from "./components/ForgotPassword";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import AppProvider from "./context/AppContext";
import PrivateRoute from "./components/PrivateRoute";


function App() {
    return (
        <div className="app">
            <Router>
                <AppProvider>
                    <Routes>
                        <Route path="/" element={ <PrivateRoute> <Layout/> </PrivateRoute> } />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/profile" element={<PrivateRoute> <Profile/> </PrivateRoute>} />
                        <Route path="/passwordReset" element={<ForgotPassword />} />
                    </Routes>
                    <ScrollToTop />
                </AppProvider>
            </Router>
        </div>
    )
}

export default App;

