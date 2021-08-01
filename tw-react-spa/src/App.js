import Header from './components/Header';
import ThreadCard from './components/ThreadCard'
import './App.scss';

function App() {
  return (
    <div>
      <Header />
      <div className="mt-5 justify-content-center">
        <ThreadCard />
      </div>
    </div>
  );
}

export default App;
