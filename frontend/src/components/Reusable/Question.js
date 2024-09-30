import React from 'react';
import comment_icon from '../../assets/comment_icon.svg';
import views_icon from '../../assets/views_icon.svg';

const Question = () => {
  return (
    <div style={styles.questionContainer}>
      <div style={styles.questionTitle}>
        ЗаголовокЗаголовокЗаголовокЗаголовокЗаголовокЗаголовокЗаголовокЗаголовокЗаголовокЗаголовок Заголовок
      </div>
      <p style={styles.questionText}>
        Ни один из прогнозов востребованности профессий не обходится без упоминания IT-сферы. Компьютеризация, которую мы в нашей стране стали замечать только в начале нулевых, идёт быстрыми темпами – и не собирается останавливаться. Не за горами те дни, когда системы «умного дома» и эффективные распознаватели речи (голосовое управление технологическими устройствами) станут обыденной реальностью – такой же, как лифты, мобильные телефоны, холодильники...
      </p>
      <div style={styles.questionStatistics}>
        <button style={styles.buttonAutor}>Иванов Д.</button>
        <div style={styles.questionNumbers}>
          <img src={views_icon} style={styles.questionIconStatistic} />
          <p style={styles.numbers}>156 876</p>
        </div>
        <div style={styles.questionNumbers}>
          <img src={comment_icon} style={styles.questionIconStatistic} />
          <p style={styles.numbers}>698</p>
        </div>
        <div style={styles.date}>21.09.2024</div> {/* Элемент Дата */}
      </div>
    </div>
  );
};

const styles = {
  questionContainer: {
    backgroundColor: '#F5F5F5',
  },
  questionTitle: {
    padding: '3% 2% 0 2%',
    fontSize: '26px',
    fontFamily: 'AlegreyaSansSC-Medium',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
  },
  questionText: {
    padding: '0 3% 0 3%',
    fontSize: '21px',
    fontFamily: 'AlegreyaSansSC',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
  },
  questionStatistics: {
    padding: '0 3% 0 3%',
    display: 'flex',
    alignItems: 'center',
  },
  buttonAutor: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5% 3% 0.5% 3%',
    fontSize: '19px',
    fontFamily: 'AlegreyaSansSC',
    border: '2px #CBCBCB solid',
    borderRadius: '10px',
  },
  questionNumbers: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1%',
    gap: '5px',
  },
  questionIconStatistic: {
    width: '25px',
  },
  date: {
    marginLeft: 'auto', // Элемент "Дата" будет прижат вправо
    fontSize: '19px',
    fontFamily: 'AlegreyaSansSC',
  },
  numbers: {
    fontFamily: 'AlegreyaSansSC-LightItalic',
    fontSize: '19px'
  }
};

export default Question;
