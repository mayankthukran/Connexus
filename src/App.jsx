import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import AuthPage from './pages/AuthPage';
import SavedPage from './pages/SavedPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path='/saved' element={<SavedPage />}/>
            <Route path='/profile' element={<ProfilePage />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;