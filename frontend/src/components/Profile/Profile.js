import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import Question from '../Reusable/Question';
import { useParams } from 'react-router-dom';

const Profile = ({ userId }) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]); // Состояние для хранения вопросов
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
  const [userInfo, setUserInfo] = useState(null); // Состояние для хранения информации о пользователе
  const navigate = useNavigate(); // Создаем функцию навигации

  useEffect(() => {
    id == localStorage.getItem("userId")? setIsMyProfile(true) : setIsMyProfile(false);
    console.log(id == localStorage.getItem("userId"));
    // Функция для отправки POST-запроса к серверу и получения вопросов
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/question/get-by-user-id', {
          method: 'POST', // Используем метод POST
          headers: {
            'Content-Type': 'application/json', // Задаём тип контента
          },
          body: JSON.stringify({ user_id: id }), // Передаём userId в теле запроса
        });

        const data = await response.json(); // Преобразуем ответ в JSON

        if (response.ok) {
          console.log(data.questions);
          setQuestions(data.questions); // Устанавливаем полученные вопросы в состояние
        } else {
          console.error('Ошибка получения вопросов:', data.message);
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      } finally {
        setLoading(false); // Отключаем индикатор загрузки после завершения запроса
      }
    };

    // Функция для получения информации о пользователе
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: id }), // Передаём userId в теле запроса
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Информация о пользователе:', data.user);
          setUserInfo(data.user); // Устанавливаем информацию о пользователе в состояние
        } else {
          console.error('Ошибка получения информации о пользователе:', data.message);
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса к пользователю:', error);
      }
    };

    fetchQuestions();
    fetchUserInfo(); // Получаем информацию о пользователе
  }, [id]); // Выполняем запрос при изменении userId

  // Обработчик нажатия на кнопку "Настройки профиля"
  const handleSettingsClick = () => {
    navigate('/settings'); // Переход на страницу настроек
  };

  // Обработчик для перехода на страницу конкретного вопроса
  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`); // Навигация на страницу вопроса с его id
  };

  if (loading) {
    return <div>Загрузка...</div>; // Отображение во время загрузки
  }

  return (
    <div style={styles.privateOfficeContainer}>
      {userInfo ? (
        <div style={styles.name}>
          {userInfo.firstname} {userInfo.lastname} {/* Отображаем имя и фамилию пользователя */}
        </div>
      ) : (
        <div>Загрузка информации о пользователе...</div>
      )}
      {isMyProfile && (
        <button style={styles.buttonSettings} onClick={handleSettingsClick}>
          Настройки профиля
        </button>
      )}
      <div style={styles.userQuestionsTitle}>{isMyProfile? "МОИ ВОПРОСЫ" : "ВОПРОСЫ ПОЛЬЗОВАТЕЛЯ"}</div>
      {questions.length ? (
        questions.map((question, index) => (
          <Question key={index} question={question} onClick={() => handleQuestionClick(question._id)} />
        ))
      ) : (
        <div>У вас нет вопросов.</div>
      )}
    </div>
  );
};

const styles = {
  privateOfficeContainer: {
    padding: '5% 10% 2% 10%',
  },
  name: {
    fontFamily: 'ElMessiri',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  buttonSettings: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '0',
    cursor: 'pointer',
    color: '#1058B7',
    fontFamily: 'AlegreyaSansSC-Regular',
    fontSize: '22px',
  },
  userQuestionsTitle: {
    textAlign: 'center',
    fontFamily: 'ElMessiri',
    color: '#1058B7',
    fontSize: '30px',
    paddingTop: '2%',
    paddingBottom: '1%',
  },
  questionContainer: {
    backgroundColor: '#CBCBCB',
  },
};

export default Profile;
