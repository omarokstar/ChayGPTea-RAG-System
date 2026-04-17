import ChatBox from './components/ChatBox';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ChatBox />
    </>
  );
}

export default App;
