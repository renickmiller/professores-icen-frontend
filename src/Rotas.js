import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import App from './App';
import Nav from './components/Nav';
import Professor from './components/Professor';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/professor" element={<Professor />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
