import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import ExplorePage from './pages/ExplorePage';
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
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} /> */}
            {/* <Route path="/saved" element={<ProtectedRoute><SavedPage /></ProtectedRoute>} /> */}
            {/* <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
          </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
      </div>
    // <BrowserRouter>
    //   <AuthProvider>
    //     <Routes>
    //       {/* <Route path="/auth" element={<AuthPage />} /> */}
    //       <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
    //       <Route path="/explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
    //       {/* <Route path="/saved" element={<ProtectedRoute><SavedPage /></ProtectedRoute>} /> */}
    //       {/* <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
    //     </Routes>
    //   </AuthProvider>
    // </BrowserRouter>
  );
}

export default App;