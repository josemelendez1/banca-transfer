import './App.css';
import Routes from "./routes/index";
import AuthProvider from './provider/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
