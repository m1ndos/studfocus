import React, { useState, useEffect } from 'react';
import like_icon from '../../assets/like_icon.svg';
import liked_icon from '../../assets/liked_icon.svg';

const Comment = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isMyComment, setIsMyComment] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes_count);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchCheckLike = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/like/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_id: comment._id, user_id: localStorage.getItem("userId") }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsLiked(data.liked);
      } else {
        console.log("Не удалось проверить наличие лайка");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLikeCreate = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/like/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_id: comment._id, user_id: localStorage.getItem("userId") }),
      });
      if (response.ok) {
        setLikesCount((prev) => prev + 1);
      } else {
        const data = await response.json();
        console.log(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLikeDelete = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/like/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_id: comment._id, user_id: localStorage.getItem("userId") }),
      });
      if (response.ok) {
        setLikesCount((prev) => prev - 1);
      } else {
        const data = await response.json();
        console.log(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCommentDelete = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/comment/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_id: comment._id}),
      });
      if (response.ok) {
        console.log("комментарий удалён");
      } else {
        const data = await response.json();
        console.log(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот комментарий?");
    if (confirmDelete) {
      try {
        const response = await fetch('http://localhost:4000/api/comment/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment_id: comment._id }),
        });
  
        if (response.ok) {
          console.log("Комментарий удалён");
          setIsDeleted(true); // Устанавливаем флаг удаления
        } else {
          const data = await response.json();
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLike = () => {
    if (isLiked) {
      fetchLikeDelete();
    } else {
      fetchLikeCreate();
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsMyComment(localStorage.getItem("userId") === comment.user_id);
    fetchCheckLike();
  }, []);

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(null);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div style={styles.commentContainer}>
      <div style={styles.autor}>{comment.autor}</div>
      <div style={styles.date}>{comment.date}</div>
      <div style={styles.text}>{comment.text}</div>

      {comment.imageUrl && (
        <img
          src={comment.imageUrl}
          alt="Comment"
          style={styles.img}
          onClick={() => openModal(comment.imageUrl)}
        />
      )}

      <div style={styles.divLikes}>
        <img
          src={isLiked ? liked_icon : like_icon}
          alt="like_icon"
          style={styles.likeIcon}
          onClick={handleLike}
        />
        <p style={styles.likeCount}>{likesCount}</p>
      </div>

      {isMyComment && (
        <button style={styles.deleteButton} onClick={handleDelete}>
          Удалить комментарий
        </button>
      )}

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={modalImageUrl} alt="Enlarged" style={styles.modalImage} />
            <span style={styles.closeIcon} onClick={closeModal}>
              ✖
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  commentContainer: {
    backgroundColor: '#F5F5F5',
    padding: '2% 2% 2% 2%',
    marginTop: '1%',
  },
  autor: {
    color: '#1058B7',
    fontSize: '23px',
    fontFamily: 'AlegreyaSansSC-Regular',
    textShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  },
  date: {
    fontSize: '23px',
    fontFamily: 'AlegreyaSansSC',
    textShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  },
  text: {
    paddingTop: '1%',
    fontSize: '23px',
    fontFamily: 'AlegreyaSansSC',
    textShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  },
  divLikes: {
    display: 'flex',
    gap: '5px',
  },
  likeIcon: {
    width: '25px',
  },
  likeCount: {
    fontFamily: 'AlegreyaSansSC-LightItalic',
    fontSize: '20px',
  },
  img: {
    width: '400px',
    marginTop: '1%',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
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
