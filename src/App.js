import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import HomePage from './components/HomePage';
import './App.css';
import store from './Redux/store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
