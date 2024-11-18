import logo from './logo.svg';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      {/* <Login /> */}
      <Register />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
