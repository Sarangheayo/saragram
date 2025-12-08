import './App.css'
import Header from './components/common/Header.jsx';
import NotificationInfo from './components/subscriptions/NotificationInfo.jsx';
import ProtectedRouter from './routes/ProtectedRouter.jsx';

function App() { 
  return (
    <>
      <Header />
      <ProtectedRouter />
      <NotificationInfo />
    </>
  )
}

export default App;
