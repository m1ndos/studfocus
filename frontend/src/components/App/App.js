import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PasswordChange from '../PasswordChange/PasswordChange';
import PrivateOffice from '../PrivateOffice/PrivateOffice';
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
          <Route path='/private-office' element={<PrivateOffice/>}/>
          <Route path='/password-change' element={<PasswordChange/>}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
