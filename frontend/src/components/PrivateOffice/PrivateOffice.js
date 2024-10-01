import React, { useState, useEffect } from 'react';
import Question from '../Reusable/Question';

const PrivateOffice = ({ userId }) => {
  const [questions, setQuestions] = useState([]); // Состояние для хранения вопросов
  const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки

  useEffect(() => {
    // Функция для отправки POST-запроса к серверу и получения вопросов
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/question/get-by-user-id', {
          method: 'POST', // Используем метод POST
          headers: {
            'Content-Type': 'application/json', // Задаём тип контента
          },
          body: JSON.stringify({ user_id: userId }), // Передаём userId в теле запроса
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

    fetchQuestions();
  }, [userId]); // Выполняем запрос при изменении userId

  if (loading) {
    return <div>Загрузка...</div>; // Отображение во время загрузки
  }

  return (
    <div style={styles.privateOfficeContainer}>
      <div style={styles.name}>Алексей Денисов</div>
      <button style={styles.buttonSettings}>Настройки профиля</button>
      <div style={styles.userQuestionsTitle}>МОИ ВОПРОСЫ</div>
      {questions.length ? (
        questions.map((question, index) => (
          <Question key={index} question={question} />
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

export default PrivateOffice;
