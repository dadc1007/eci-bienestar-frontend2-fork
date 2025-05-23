import WebSocketClient from './components/WebSocketClient';
import NotificationPermission from './components/NotificationPermission';
import './App.css';

function App() {
  return (
    <div>
      <NotificationPermission />
      <WebSocketClient />
    </div>
  );
}


export default App;
