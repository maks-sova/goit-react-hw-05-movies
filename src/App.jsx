import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" navigator={<Home />} />
        <Route path="/movies" navigator={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
