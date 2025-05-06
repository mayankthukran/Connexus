import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
// import SavedPage from './pages/SavedPage';
// import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/shared/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <AuthProvider> */}
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            {/* <Route path="/saved" element={<ProtectedRoute><SavedPage /></ProtectedRoute>} /> */}
            {/* <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
          </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
      </div>
  );
}

export default App;

// function App() {
//   // Check if user is logged in
//   const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<AuthPage />} />
//           <Route 
//             path="/home" 
//             element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} 
//           />
//           {/* Redirect any unknown routes to AuthPage */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;