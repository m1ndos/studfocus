import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PasswordChange from '../PasswordChange/PasswordChange';
import PrivateOffice from '../PrivateOffice/PrivateOffice';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Импортируем useEffect и useState

function App() {
  const [userId, setUserId] = useState(null); // Состояние для хранения userId

  useEffect(() => {
    // Получаем userId из localStorage при загрузке компонента
    console.log("userId: " + userId);
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId); // Обновляем состояние
  }, [userId]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header userId={userId} setUserId={setUserId}/> {/* Передаем userId в Header */}
        <Routes>
          <Route path="/signin" element={<SignIn userId={userId} setUserId={setUserId} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/private-office' element={<PrivateOffice />} />
          <Route path='/password-change' element={<PasswordChange />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
