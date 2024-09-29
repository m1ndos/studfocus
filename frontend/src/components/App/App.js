import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
