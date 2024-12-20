import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo_header from '../../assets/logo_header.svg';
import private_office_icon from '../../assets/private_office_icon.svg';

const Header = ({ userId, setUserId }) => { // Принимаем userId как пропс
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePrivateOfficeClick = () => {
    if(localStorage.getItem('userId')!=null) navigate('/profile/' + userId);
    else navigate("/signin")
  };

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleAuthButtonClick = () => {
    if (userId) { // Используем userId напрямую
      localStorage.removeItem('userId'); // Удаляем userId из localStorage
      setUserId(null);      
      navigate('/'); // Перенаправляем на главную страницу
    } else {
      navigate('/signin'); // Перенаправляем на страницу входа
    }
  };

  return (
    <div style={styles.header}>
      <img src={logo_header} style={styles.logoHeader} alt="Logo" onClick={handleLogoClick}/>
      <div style={styles.textHeader}>
        <div style={styles.studfocus}>СТУДФОКУС</div>
        <div style={styles.otherText}>платформа, для тех, кто строит образовательное будущее</div>
      </div>
      <div 
        style={styles.containerPrivateOfficeIcon}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={private_office_icon} 
          style={styles.private_office_icon} 
          alt="Личный кабинет" 
          onClick={handlePrivateOfficeClick}
        />
        {isHovered && (
          <div style={styles.buttonContainer}>
            <button 
              style={styles.buttonOffice} 
              onClick={handlePrivateOfficeClick}
            >
              Личный кабинет
            </button>
            <button 
              style={styles.buttonSignIn} 
              onClick={handleAuthButtonClick}
            >
              {userId ? 'Выход' : 'Вход'} {/* Используем userId для определения текста кнопки */}
            </button>
          </div>
        )} 
      </div>
    </div>
  );
};

const styles = {
  header: {
    width: '100%',
    height: '110px',
    backgroundColor: '#1058B7',
    display: 'flex',
    alignItems: 'center',
  },
  logoHeader: {
    cursor: 'pointer',
    width: '100px',
    marginLeft: '4%',
  },
  textHeader: {
    width: '80%',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  studfocus: {
    fontFamily: 'AlegreyaSansSC extrabold',
    letterSpacing: '20px',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '40px',
  },
  otherText: {
    color: 'white',
    fontFamily: 'ElMessiri',
    fontSize: '30px',
  },
  containerPrivateOfficeIcon: {
    width: '10%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
  },
  private_office_icon: {
    width: '50px',
    marginRight: '15px',
    marginBottom: '15px',
    cursor: 'pointer',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '-49%',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 1,
    backgroundColor: '#F5F5F5',
    width: '150px',
  },
  buttonOffice: {
    marginLeft: '5px',
    paddingLeft: '10px',
    backgroundColor: '#F5F5F5',
    color: '#1058B7',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'ElMessiri',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    textDecoration: 'underline',
  },
  buttonSignIn: {
    marginLeft: "5px",
    paddingLeft: '10px',
    backgroundColor: '#F5F5F5',
    color: '#1058B7',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'ElMessiri',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default Header;
