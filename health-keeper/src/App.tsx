import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout, Login, Register, Dashboard } from './components/index';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
