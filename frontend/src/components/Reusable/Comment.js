import React, { useState } from 'react';
import like_icon from '../../assets/like_icon.svg';

const Comment = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [modalImageUrl, setModalImageUrl] = useState(null); // URL изображения для модального окна

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
    <div style={styles.commentContainer}>
      <div style={styles.autor}>{comment.autor}</div>
      <div style={styles.date}>{comment.date}</div>
      <div style={styles.text}>{comment.text}</div>

      {/* Если есть изображение, оно кликабельно для увеличения */}
      {comment.imageUrl && (
        <img
          src={comment.imageUrl}
          alt="Comment"
          style={styles.img}
          onClick={() => openModal(comment.imageUrl)}
        />
      )}

      <div style={styles.divLikes}>
        <img src={like_icon} alt='like_icon' style={styles.likeIcon}></img>
        <p style={styles.likeCount}>{comment.likes_count}</p>
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
}

const styles = {
  commentContainer: {
    backgroundColor: '#F5F5F5',
    padding: '2% 2% 0% 2%',
    marginTop: '1%'
  },
  autor: {
    color: '#1058B7',
    fontSize: '23px',
    fontFamily: 'AlegreyaSansSC-Regular',
    textShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
  },
  date: {
    fontSize: '23px',
    fontFamily: 'AlegreyaSansSC',
    textShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
  },
  text: {
    paddingTop: '1%',
    fontSize: '23px',
    fontFamily: 'AlegreyaSansSC',
    textShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
  },
  divLikes: {
    display: 'flex',
    gap: '5px'
  },
  likeIcon: {
    width: '25px'
  },
  likeCount: {
    fontFamily: 'AlegreyaSansSC-LightItalic',
    fontSize: '20px'
  },
  img: {
    width: '400px',
    marginTop: '1%',
    cursor: 'pointer' // Добавляем указатель при наведении
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

export default Comment;
