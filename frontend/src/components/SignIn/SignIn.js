import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate(); // Используем хук useNavigate

  const handleSignUpClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    navigate('/signup'); // Перемещаем пользователя на страницу регистрации
  };

  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <label style={styles.label}>
          Логин
          <input type="text" style={styles.input} />
        </label>
        <label style={styles.label}>
          Пароль
          <input type="password" style={styles.input} />
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
