import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Импортируем хук useParams
import Question from '../Reusable/Question';

const QuestionPage = () => {
  const { id } = useParams(); // Получаем id из URL
  const [question, setQuestion] = useState(null); // Состояние для хранения вопроса
  const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
  const [error, setError] = useState(null); // Состояние для хранения ошибок

  useEffect(() => {
    // Функция для получения вопроса по id
    const fetchQuestion = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/question/get-by-id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), // Передаем id в теле запроса
        });

        const data = await response.json();

        if (response.ok) {
          setQuestion(data.question); // Устанавливаем полученный вопрос в состояние
        } else {
          setError(data.message); // Устанавливаем сообщение об ошибке
        }
      } catch (err) {
        setError('Ошибка при получении вопроса'); // Устанавливаем общее сообщение об ошибке
      } finally {
        setLoading(false); // Отключаем индикатор загрузки
      }
    };

    fetchQuestion(); // Вызываем функцию для получения вопроса
  }, [id]); // Выполняем запрос при изменении id

  if (loading) {
    return <div>Загрузка...</div>; // Отображение во время загрузки
  }

  if (error) {
    return <div>{error}</div>; // Отображение ошибки, если она есть
  }

  return (
    <div>
      <Question question={question}></Question>
    </div>
  );
};

export default QuestionPage;
