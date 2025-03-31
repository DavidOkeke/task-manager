
import './App.css';
import Task from './components/Task';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        {/* Load Signin.js as the default route */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </Router>
  );
}

export default App;