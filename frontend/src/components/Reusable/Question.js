import React from 'react';
import comment_icon from '../../assets/comment_icon.svg';
import views_icon from '../../assets/views_icon.svg';

const Question = ({ params }) => {

  const limit = 400;

  // Функция для обрезки текста
  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;

    const truncated = text.slice(0, limit); // Обрезаем текст до лимита
    const lastSpaceIndex = truncated.lastIndexOf(' '); // Находим последний пробел

    return truncated.slice(0, lastSpaceIndex) + '...'; // Обрезаем до последнего целого слова и добавляем '...'
  };

  const truncatedText = truncateText(params.text, limit); // Обрезаем текст до 400 символов

  return (
    <div style={styles.questionContainer}>
      <div style={styles.questionTitle}>{params.title}</div>
      <p style={styles.questionText}>{truncatedText}</p>
      <div style={styles.questionStatistics}>
        <button style={styles.buttonAutor}>{params.autor}</button>
        <div style={styles.questionNumbers}>
          <img src={views_icon} style={styles.questionIconStatistic} alt="views icon" />
          <p style={styles.numbers}>{params.views}</p>
        </div>
        <div style={styles.questionNumbers}>
          <img src={comment_icon} style={styles.questionIconStatistic} alt="comment icon" />
          <p style={styles.numbers}>{params.comments}</p>
        </div>
        <div style={styles.date}>{params.date}</div>
      </div>
    </div>
  );
};

const styles = {
  questionContainer: {
    backgroundColor: '#F5F5F5',
    marginBottom: '20px',
    padding: '10px',
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
    fontSize: '19px',
  },
};

export default Question;
