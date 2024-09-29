import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const PrivateOffice = () => {
  const navigate = useNavigate(); // Инициализируем хук навигации

  // Состояния для хранения значений полей
  const [login, setLogin] = useState(''); // Логин, который нельзя изменять
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Состояние для хранения объекта User
  const [user, setUser] = useState({});

  // Обработчик сабмита формы
  const handleSave = (event) => {
    event.preventDefault();
    // Создаем объект User с данными
    const newUser = {
      login,
      firstName,
      lastName,
    };

    // Сохраняем объект User в состоянии
    setUser(newUser);

    // Логируем данные
    console.log('Данные сохранены:', newUser);
  };

  const handleDeleteAccount = () => {
    // Логика для удаления аккаунта
    console.log('Аккаунт удалён');
  };

  const handleChangePassword = () => {
    navigate('/password-change'); // Перенаправляем на маршрут password-change
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSave}>
        <label style={styles.label}>
          Логин
          <input
            type="text"
            style={styles.inputInactive}
            value={login}
            onChange={(e) => setLogin(e.target.value)} // Вы можете оставить это, если хотите задать начальное значение
            readOnly // Делаем поле логина неизменяемым
          />
        </label>
        <label style={styles.label}>
          Имя
          <input
            type="text"
            style={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
        <div style={styles.buttonContainer}>
          <div style={styles.buttonSaveAndDeleteContainer}>
            <button type="submit" style={styles.saveButton}>
              Сохранить
            </button>
            <button type="button" style={styles.saveButton} onClick={handleChangePassword}>
              Сменить пароль
            </button>
          </div>
          <button type="button" style={styles.deleteButton} onClick={handleDeleteAccount}>
            Удалить аккаунт
          </button>
        </div>
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
    textAlign: 'left', // Выравнивание текста в лейбле по левому краю
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
  inputInactive: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd', // Светлее, чем у активного поля
    backgroundColor: '#f5f5f5', // Светлый фон для неактивного поля
    color: '#888', // Цвет текста для неактивного поля
    fontFamily: 'ElMessiri',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  buttonSaveAndDeleteContainer: {
    display: 'flex',
    justifyContent: 'space-between', // Распределяем кнопки с равным расстоянием между ними
    marginBottom: '10px', // Отступ между кнопками и кнопкой удаления
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
    width: '48%', // Устанавливаем ширину для одинакового размера
  },
  deleteButton: {
    padding: '10px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'ElMessiri',
    fontSize: '16px',
  },
};

export default PrivateOffice;