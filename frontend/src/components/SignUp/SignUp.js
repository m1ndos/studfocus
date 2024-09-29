import React, { useState } from 'react';

const SignUp = () => {
  // Состояния для хранения значений полей
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Состояние для хранения ошибки

  // Обработчик сабмита формы
  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setError(''); // Очищаем ошибку, если пароли совпадают

    // Собираем значения в объект User
    const user = {
      firstName,
      lastName,
      login,
      password,
    };

    console.log(user); // Для тестирования выводим объект в консоль

    // Здесь можно отправить объект на сервер или обработать его другим способом
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Имя
          <input
            type="text"
            style={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} // Обновляем состояние при изменении значения
          />
        </label>
        <label style={styles.label}>
          Фамилия
          <input
            type="text"
            style={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Логин
          <input
            type="text"
            style={styles.input}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Пароль
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Повтор пароля
          <input
            type="password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {/* Отображение ошибки при несовпадении паролей */}
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Зарегистрироваться
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
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: '10px',
    fontFamily: 'ElMessiri',
  },
  error: {
    color: 'red', // Красный цвет для сообщения об ошибке
    fontSize: '14px',
    marginTop: '-10px', // Немного поднимаем, чтобы было ближе к полю ввода
    marginBottom: '10px',
    fontFamily: 'ElMessiri'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    fontFamily: 'ElMessiri',
    fontSize: '15px',
  },
};

export default SignUp;
