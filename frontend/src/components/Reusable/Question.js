import React, { useState } from 'react';
import comment_icon from '../../assets/comment_icon.svg';
import views_icon from '../../assets/views_icon.svg';

const Question = ({ question, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [modalImageUrl, setModalImageUrl] = useState(null); // URL изображения для модального окна

  const limit = 400;

  // Функция для обрезки текста
  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;

    const truncated = text.slice(0, limit); // Обрезаем текст до лимита
    const lastSpaceIndex = truncated.lastIndexOf(' '); // Находим последний пробел

    return truncated.slice(0, lastSpaceIndex) + '...'; // Обрезаем до последнего целого слова и добавляем '...'
  };

  const truncatedText = truncateText(question.text, limit); // Обрезаем текст до 400 символов

  // Открыть модальное окно с изображением
  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  // Закрыть модальное окно
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(null);
  };

  return (
    <div style={styles.questionContainer}>
      <div style={styles.questionTitle}>{question.title}</div>
      <div style={styles.imgAndText}>
        {/* Если есть изображение, оно кликабельно для увеличения */}
        {question.imageUrl && (
          <img
            src={question.imageUrl}
            alt="Question"
            style={styles.questionImage}
            onClick={() => openModal(question.imageUrl)}
          />
        )}
        <p style={styles.questionText}>{truncatedText}</p>
      </div>
      <div style={styles.questionStatistics}>
        <button style={styles.buttonAutor} onClick={onClick}>{question.autor}</button>
        <div style={styles.questionNumbers}>
          <img src={views_icon} style={styles.questionIconStatistic} alt="views icon" />
          <p style={styles.numbers}>{question.views_count}</p>
        </div>
        <div style={styles.questionNumbers}>
          <img src={comment_icon} style={styles.questionIconStatistic} alt="comment icon" />
          <p style={styles.numbers}>{question.comments_count}</p>
        </div>
        <div style={styles.date}>{question.date}</div>
      </div>

      {/* Модальное окно для увеличенного изображения */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={modalImageUrl} alt="Enlarged" style={styles.modalImage} />
            <span style={styles.closeIcon} onClick={closeModal}>✖</span>
          </div>
        </div>
      )}
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
  imgAndText: {
    display: 'flex',
    alignItems: 'center',
  },
  questionImage: {
    width: '300px',
    height: '300px',
    padding: '2% 0 1% 3%',
    cursor: 'pointer', // Добавляем указатель при наведении
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
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
  },
  modalImage: {
    maxWidth: '55vw',
    maxHeight: '55vh',
    padding: '10px',
  },
  closeIcon: {
    position: 'absolute',
    top: '0px',
    right: '3px',
    fontSize: '30px',
    cursor: 'pointer',
    color: '#1058B7',
    zIndex: 10,
  },
};

export default Question;
