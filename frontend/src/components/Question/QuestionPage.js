import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Question from '../Reusable/Question';
import Comment from '../Reusable/Comment';
import clip_icon from '../../assets/clip_icon.svg';
import send_icon from '../../assets/send_icon.svg';

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State for image URL
  const textareaRef = useRef(null); // Ref for textarea
  const fileInputRef = useRef(null); // Ref for file input

  const fetchQuestion = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/question/get-by-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        setQuestion(data.question);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Ошибка при получении вопроса');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/comment/get-by-question-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question_id: id }),
      });
      const data = await response.json();
      if (response.ok) {
        setComments(data.comments);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Ошибка при получении комментариев');
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchComments();
    setLoading(false);
  }, [id]);

  const handleInput = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    formData.append('comment_text', textareaRef.current.value);
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      formData.append('image', blob, 'uploaded_image'); // Append the image blob
    }

    try {
      const res = await fetch('http://localhost:4000/api/comment/create', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data); // Handle the response from the server
        setComments((prev) => [...prev, data.comment]); // Add the new comment to the comments state
        textareaRef.current.value = ''; // Clear the textarea
        setImageUrl(null); // Reset the image URL
      } else {
        console.error('Error creating comment:', res.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.questionPageContainer}>
      {question && <Question question={question} />}
      <div style={styles.commentsContainer}>
        <h2>Комментарии</h2>
        {comments.length ? (
          comments.map((comment) => <Comment key={comment._id} comment={comment} />)
        ) : (
          <p>Комментариев пока нет.</p>
        )}
      </div>
      <form style={styles.form} onSubmit={handleCommentSubmit}>
        <label>
          <div style={styles.divInput}>
            
            <textarea
              ref={textareaRef}
              style={styles.textarea}
              onInput={handleInput}
              placeholder="Напишите комментарий..."
            ></textarea>
          </div>
        </label>
        <div style={styles.divMessageIcons}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
          {/* Render the uploaded image here */}
          {imageUrl && <img src={imageUrl} alt='uploaded' style={styles.uploadedImage} />}
          <img src={clip_icon} alt='clip_icon' style={styles.messageIcons} onClick={handleIconClick} />
          <img src={send_icon} alt='send_icon' style={styles.messageIcons} onClick={handleCommentSubmit} />
        </div>
      </form>
    </div>
  );
};

const styles = {
  questionPageContainer: {
    padding: '5% 10% 2% 10%',
  },
  commentsContainer: {
    marginTop: '20px',
  },
  form: {
    marginTop: '2%',
    border: '1px solid black',
    borderRadius: '10px',
  },
  divInput: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center', // Align items vertically
  },
  textarea: {
    marginLeft: '1%',
    marginTop: '0.5%',
    width: '95%', // Adjusted to allow space for the image
    minHeight: '30px', // Starting height for textarea
    fontFamily: 'AlegreyaSansSC-Regular',
    fontSize: '25px',
    border: 'none',
    resize: 'none',
    overflowY: 'hidden',
    outline: 'none',
  },
  divMessageIcons: {
    display: 'flex',
    justifyContent: 'right',
    padding: '0 1% 1% 1%',
    gap: '5px',
  },
  messageIcons: {
    width: '30px',
    cursor: 'pointer',
  },
  uploadedImage: {
    width: '40px',
    height: '40px', // Adjust height to maintain a square aspect ratio
    marginRight: '5px', // Space between the image and textarea
  },
};

export default QuestionPage;
