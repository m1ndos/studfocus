import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footer}>
      {/* Левая колонка: Логотип */}
      <div style={styles.column}>
        <img src="/path-to-logo.png" alt="Logo" style={styles.logo} />
      </div>

      {/* Средняя колонка: Контакты */}
      <div style={styles.column}>
        <div style={styles.contactItem}>Address: 1234 Street Name</div>
        <div style={styles.contactItem}>Email: example@email.com</div>
        <div style={styles.contactItem}>Phone: +123456789</div>
      </div>

      {/* Правая колонка: Текст и картинки */}
      <div style={{ ...styles.column, ...styles.info }}>
        <div style={styles.footerText}>Follow us on social media:</div>
        <div style={styles.icons}>
          <img src="/path-to-icon1.png" alt="Icon 1" style={styles.icon} />
          <img src="/path-to-icon2.png" alt="Icon 2" style={styles.icon} />
        </div>
      </div>
    </div>
  );
};

// Стили, встроенные в объект JavaScript
const styles = {
  footer: {
    width: '95%', // Немного меньше ширины страницы
    margin: '0 auto', // Выравнивание по центру
    display: 'flex',
    justifyContent: 'space-between', // Равномерное распределение колонок
    alignItems: 'flex-start',
    padding: '20px 0',
    backgroundColor: '#f5f5f5', // Цвет фона
    borderTop: '1px solid #ccc',
  },
  column: {
    flex: 1, // Все колонки будут равной ширины
    padding: '0 20px',
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
  contactItem: {
    marginBottom: '10px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Разделение на две части
  },
  footerText: {
    marginBottom: '10px',
  },
  icons: {
    display: 'flex',
    gap: '10px', // Разделение между иконками
  },
  icon: {
    width: '30px', // Размер иконок
    height: 'auto',
  },
};

export default Footer;
