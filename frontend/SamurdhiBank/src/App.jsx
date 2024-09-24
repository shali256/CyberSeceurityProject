import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import Home from "./pages/Home.jsx"
import PoliciesPage from "./pages/Policies.jsx"; 
import QuizPage from "./pages/QuizView.jsx";
import Displayquiz from './pages/QuizQuestions.jsx';

import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useAuthStore } from "./store/authStore.js";
import QuizResult from "./pages/ResultPage.jsx";
import QuizDashboard from './pages/Admin/UserResultDashboard.jsx';
import AdminHome from './pages/Admin/AdminHome.jsx';
import UserPanal from "./pages/Admin/UserPanal.jsx";
import UserContactForm from "./pages/UserContactForm.jsx";
import ContactDashboard from "./pages/Admin/ContactDashboard.jsx";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div>
      <Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route 
					path='/verify-email' 
					element={<EmailVerificationPage />} />


				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
					<Route
					path='/policies'
					element={
						<ProtectedRoute>
							<PoliciesPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/support'
					element={
						<ProtectedRoute>
							<UserContactForm />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/quiz'
					element={
						<ProtectedRoute>
							<QuizPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/quiz/:subject'
					element={
						<ProtectedRoute>
							<Displayquiz />
						</ProtectedRoute>
					}
				/>
				<Route 
					path="/result/:username/:subject" 
					element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />


				<Route
					path='/profile'
					element={<ProtectedRoute><DashboardPage /></ProtectedRoute>
					}
				/>

				<Route 
					path="/admin-panel" 
					element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>

				<Route 
					path="/questionanswers"
					element={<ProtectedRoute><QuizDashboard/></ProtectedRoute>}/>

				
				<Route
					path="/employee"
					element={<ProtectedRoute><UserPanal/></ProtectedRoute>}/>


				<Route 
					path="contactdashboard"
					element={<ProtectedRoute><ContactDashboard/></ProtectedRoute>}/>			
				

				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
    </div>
  );
}

export default App;
