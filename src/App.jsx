import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import AuthPage from './pages/AuthPage';
import SavedPage from './pages/SavedPage';

function App() {
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route 
            path="/home" 
            element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} 
          />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path='/saved' element={<SavedPage />}/>
          </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;