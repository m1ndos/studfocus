import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate(); // Используем хук useNavigate

  // Состояния для хранения значений полей логина и пароля
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  // Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Создаем объект User с логином и паролем
    const user = {
      login,
      password,
    };

    console.log(user); // Выводим объект в консоль для проверки

    // Здесь можно добавить логику для отправки данных на сервер
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
};

export default SignIn;
