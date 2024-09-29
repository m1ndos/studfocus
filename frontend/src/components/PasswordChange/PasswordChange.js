import React, { useState } from 'react';

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Обработчик сохранения пароля
  const handleSave = (event) => {
    event.preventDefault();
    // Здесь можно добавить логику для проверки и сохранения пароля
    console.log('Сохранение пароля:', { currentPassword, newPassword, confirmPassword });
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
            required // Обязательное поле
          />
        </label>
        <label style={styles.label}>
          Новый пароль
          <input
            type="password"
            style={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required // Обязательное поле
          />
        </label>
        <label style={styles.label}>
          Подтверждение нового пароля
          <input
            type="password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required // Обязательное поле
          />
        </label>
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
};

export default PasswordChange;
