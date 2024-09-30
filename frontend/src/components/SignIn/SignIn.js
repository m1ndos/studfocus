import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ userId, setUserId }) => {
  const navigate = useNavigate(); // Используем хук useNavigate

  // Состояния для хранения значений полей логина и пароля
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Состояние для ошибки

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Создаем объект User с логином и паролем
    const user = {
      login,
      password,
    };

    console.log(user); // Выводим объект в консоль для проверки

    try {
      // Отправка POST-запроса на сервер
      const response = await fetch('http://localhost:4000/api/user/signin', {
        method: 'POST', // Метод запроса
        headers: {
          'Content-Type': 'application/json', // Указываем, что отправляем JSON
        },
        body: JSON.stringify(user), // Преобразуем объект user в строку JSON
      });

      // Обработка ответа
      if (response.ok) {
        const data = await response.json();
        console.log('Вход успешен:', data);
        
        // Сохраняем userId в localStorage
        localStorage.setItem('userId', data.userId);
        setUserId(data.userId);
        setErrorMessage(''); // Очищаем сообщение об ошибке при успешном входе
      } else {
        const errorData = await response.json();
        console.error('Ошибка при входе:', errorData.message || 'Неизвестная ошибка');
        setErrorMessage(errorData.message || 'Ошибка при входе'); // Устанавливаем сообщение об ошибке
      }
    } catch (error) {
      console.error('Сетевая ошибка или сервер недоступен:', error);
      setErrorMessage('Сетевая ошибка или сервер недоступен'); // Устанавливаем сообщение об ошибке
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    navigate('/signup'); // Перемещаем пользователя на страницу регистрации
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Логин
          <input
            type="text"
            style={styles.input}
            value={login}
            onChange={(e) => setLogin(e.target.value)} // Обновляем состояние при изменении значения
          />
        </label>
        <label style={styles.label}>
          Пароль
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Обновляем состояние при изменении значения
          />
        </label>

        {/* Отображаем сообщение об ошибке под полем пароля, если ошибка присутствует */}
        {errorMessage && <div style={styles.error}>{errorMessage}</div>}

        <div style={styles.signupText}>
          Нет аккаунта? <a href="/signup" onClick={handleSignUpClick}>Зарегистрироваться</a>
        </div>
        <button type="submit" style={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
  },
  label: {
    marginBottom: '10px',
    textAlign: 'left',
    display: 'block',
    width: '100%',
    fontFamily: 'ElMessiri',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    boxSizing: 'border-box',
    fontFamily: 'ElMessiri',
    borderRadius: '10px',
    borderWidth: '1px',
  },
  signupText: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '14px',
    fontFamily: 'ElMessiri',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1058B7',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    width: '100%',
    fontFamily: 'ElMessiri',
    fontSize: '15px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontFamily: 'ElMessiri',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default SignIn;
