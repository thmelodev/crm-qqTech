import { AuthProvider } from './context/auth';
import './css/App.css';
import AppRouter from './routes';



function App() {
  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  );
}

export default App;
