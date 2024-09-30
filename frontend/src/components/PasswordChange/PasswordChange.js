import React, { useState } from 'react';

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Состояние для ошибок
  const [successMessage, setSuccessMessage] = useState(''); // Состояние для успешного сообщения

  // Обработчик сохранения пароля
  const handleSave = async (event) => {
    event.preventDefault();

    // Сбрасываем сообщения об ошибке и успехе перед отправкой запроса
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Создаем объект с данными
      const requestBody = {
        userId: localStorage.getItem('userId'), // Получаем userId из localStorage
        currentPassword,
        newPassword,
        confirmPassword,
      };

      // Отправляем POST-запрос на сервер
      const response = await fetch('http://localhost:4000/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Преобразуем объект в JSON
      });

      // Обрабатываем ответ сервера
      const data = await response.json();

      if (!response.ok) {
        // Если сервер вернул ошибку, устанавливаем сообщение об ошибке
        setErrorMessage(data.message || 'Ошибка при смене пароля.');
      } else {
        // Если запрос успешен, показываем сообщение об успехе
        setSuccessMessage('Пароль успешно изменен!');
      }
    } catch (error) {
      // Обработка сетевой ошибки
      setErrorMessage('Произошла ошибка при смене пароля. Попробуйте снова.');
      console.error('Ошибка:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSave}>
        <label style={styles.label}>
          Текущий пароль
          <input
            type="password"
            style={styles.input}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label style={styles.label}>
          Новый пароль
          <input
            type="password"
            style={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label style={styles.label}>
          Подтверждение нового пароля
          <input
            type="password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
        <button type="submit" style={styles.saveButton}>
          Сохранить
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
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    padding: '20px',
  },
  label: {
    marginBottom: '10px',
    fontFamily: 'ElMessiri',
    fontSize: '16px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontFamily: 'ElMessiri',
    fontSize: '16px',
  },
  saveButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'ElMessiri',
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
    fontFamily: 'ElMessiri',
  },
  successMessage: {
    color: 'green',
    marginBottom: '20px',
    fontFamily: 'ElMessiri',
  },
};

export default PasswordChange;
