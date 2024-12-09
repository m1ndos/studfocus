import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PasswordChange from '../PasswordChange/PasswordChange';
import Settings from '../Settings/Settings';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Main from '../Main/Main';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Импортируем useEffect и useState
import Profile from '../Profile/Profile';
import CreateQuestion from '../CreateQuestion/CreateQuestion';
import QuestionPage from '../Question/QuestionPage';

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
      <div className="App" style={styles.appContainer}>
        <Header userId={userId} setUserId={setUserId} /> {/* Передаем userId в Header */}
        <div style={styles.contentContainer}>
          <Routes>
          <Route path="/" element={<Main />} />
            <Route path="/signin" element={<SignIn userId={userId} setUserId={setUserId} />} />
            <Route path="/signup" element={<SignUp userId={userId} setUserId={setUserId}/>} />
            <Route path="/create-question" element={<CreateQuestion />} />
            <Route path="/profile/:id" element={<Profile userId={userId}/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/password-change" element={<PasswordChange />} />
            <Route path="/question/:id" element={<QuestionPage userId={userId}/>}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Высота контейнера равна высоте окна браузера
  },
  contentContainer: {
    flex: 1, // Контент растягивается, чтобы занять всё оставшееся пространство
  },
};

export default App;
