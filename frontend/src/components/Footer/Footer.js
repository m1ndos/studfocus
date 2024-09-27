import React from 'react';
import footer_logo from '../../assets/logo_footer.png';
import telegram_logo from '../../assets/telegram_logo.svg';
import vk_logo from '../../assets/vk_logo.svg';
import viber_logo from '../../assets/viber_logo.svg';

const Footer = () => {
  return (
    <div style={styles.footer}>
      {/* Левая колонка: Логотип */}
      <div style={styles.column}>
        <img src={footer_logo} alt="Logo" style={styles.logo} />
      </div>

      {/* Средняя колонка: Контакты */}
      <div style={styles.column}>
        <div style={styles.contactTitle}>Контакты</div>
        <div style={styles.contactItem}>88007772424</div>
        <div style={styles.contactItem}>POCHTA@MAIL.RU</div>
      </div>

      {/* Правая колонка: Текст и картинки */}
      <div style={{ ...styles.column, ...styles.info }}>
        <div style={styles.footerText}>Мы в социальных сетях</div>
        <div style={styles.icons}>
          <img src={viber_logo} alt="Icon 1" style={styles.icon} />
          <img src={vk_logo} alt="Icon 2" style={styles.icon} />
          <img src={telegram_logo} alt="Icon 3" style={styles.icon} />
        </div>
      </div>
    </div>
  );
};

// Стили, встроенные в объект JavaScript
const styles = {
  footer: {
    width: '80%', // Немного меньше ширины страницы
    margin: '0 auto', // Выравнивание по центру
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between', // Равномерное распределение колонок
    alignItems: 'flex-start',
    padding: '20px 0',
    borderTop: '1px solid #ccc',
  },
  column: {
    flex: 1, // Все колонки будут равной ширины
    padding: '0 20px',
    textAlign: 'center', // Центрирование содержимого
  },
  logo: {
    width: '180px',
    height: 'auto',
    cursor: 'pointer'
  },

  contactTitle: {
    fontFamily: 'AlegreyaSansSC',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1058B7'
  },

  contactItem: {
    fontFamily: 'AlegreyaSansSC',
    fontSize: '20px'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Разделение на две части
  },
  footerText: {
    marginBottom: '10px',
    fontFamily: 'AlegreyaSansSC',
    fontSize: '20px',
    color: '#1058B7',
    fontWeight: 'bold'
  },
  icons: {
    display: 'flex',
    gap: '10px', // Разделение между иконками
    justifyContent: 'center', // Центрирование иконок
  },
  icon: {
    width: '40px', // Размер иконок
    height: 'auto',
    cursor: 'pointer'
  },
};

export default Footer;
