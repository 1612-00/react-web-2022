import './assets/boxicons-2.1.1/css/boxicons.min.css';
import './scss/app.scss';
import TopNav from "./components/topNav/TopNav";
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <TopNav />
      <Home />
    </div>
  );
}

export default App;
