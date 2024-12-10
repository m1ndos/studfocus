import React, { useEffect, useState } from 'react';

const Stats = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [userCount, setUserCount] = useState(0); // Состояние для количества пользователей
  const [viewCount, setViewCount] = useState(0);

  // Функция для получения количества вопросов
  const fetchQuestionCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/questions/count'); // URL API
      const data = await response.json();

      if (response.ok) {
        setQuestionCount(data.count); // Устанавливаем количество вопросов в состояние
      } else {
        console.error('Error fetching question count:', data.message);
      }
    } catch (error) {
      console.error('Error fetching question count:', error);
    }
  };

  // Функция для получения количества пользователей
  const fetchUserCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/user/count'); // URL API
      const data = await response.json();

      if (response.ok) {
        setUserCount(data.count); // Устанавливаем количество пользователей в состояние
      } else {
        console.error('Error fetching user count:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const fetchViewCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/view/total'); // URL API
      const data = await response.json();

      if (response.ok) {
        setViewCount(data.totalViews); // Устанавливаем количество просмотров в состояние
      } else {
        console.error('Error fetching view count:', data.message);
      }
    } catch (error) {
      console.error('Error fetching view count:', error);
    }
  };

  // Используем useEffect для выполнения запросов при загрузке компонента
  useEffect(() => {
    fetchQuestionCount();
    fetchUserCount();
    fetchViewCount();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.title}>Статистика</div>
      <div>Количество вопросов: {questionCount}</div>
      <div>Количество пользователей: {userCount}</div>
      <div>Количество просмотров вопросов: {viewCount}</div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'ElMessiri',
  },
};

export default Stats;
