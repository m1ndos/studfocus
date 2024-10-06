import React, { useState, useRef } from 'react';
import clip_icon from '../../assets/clip_icon.svg';

const CreateQuestion = () => {
  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_TITLE_LENGTH = 100;
  const MAX_TEXT_LENGTH = 300;

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    const formData = new FormData(); // Создаем новый объект FormData
    formData.append('user_id', localStorage.getItem('userId'))
    formData.append('title', titleValue); // Добавляем заголовок
    formData.append('text', textValue); // Добавляем текст
    if (imageUrl) {
        const response = await fetch(imageUrl); // Получаем изображение из URL
        const blob = await response.blob(); // Преобразуем его в Blob
        formData.append('image', blob, 'uploaded_image'); // Добавляем изображение
        console.log(formData);
        
    }

    try {
        const res = await fetch('http://localhost:4000/api/question/create', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data); // Здесь вы можете обработать ответ от сервера
            // Сброс формы после отправки
            setTitleValue('');
            setTextValue('');
            setImageUrl(null);
        } else {
            console.error('Error creating question:', res.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div>
      <form style={styles.questionCreateForm} onSubmit={handleSubmit}>
        <label style={styles.questionCreateLabel}>
          <span style={styles.labelText}>Заголовок</span>
          <div style={styles.divInput}>
            <input
              style={styles.inputTitle}
              value={titleValue}
              onChange={handleTitleChange}
              maxLength={MAX_TITLE_LENGTH}
            />
            <div style={styles.divCharacters}>
              <p style={{ ...styles.pCount, color: titleValue.length === MAX_TITLE_LENGTH ? 'red' : 'black' }}>
                {titleValue.length}/{MAX_TITLE_LENGTH}
              </p>
            </div>
          </div>
        </label>
        <label style={styles.questionCreateLabel}>
          <span style={styles.labelText}>Текст</span>
          <div style={styles.divInput}>
            <textarea
              style={styles.textareaText}
              value={textValue}
              onChange={handleTextChange}
              maxLength={MAX_TEXT_LENGTH}
            ></textarea>
            <div style={styles.divCharactersAndIcon}>
              <div style={styles.divCharacters}>
                <p style={{ ...styles.pCount, color: textValue.length === MAX_TEXT_LENGTH ? 'red' : 'black' }}>
                  {textValue.length}/{MAX_TEXT_LENGTH}
                </p>
              </div>
              <div style={styles.divIcon}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt='uploaded'
                    style={styles.uploadedImage}
                    onClick={openModal} // Открываем модал при нажатии на изображение
                  />
                )}
                <img src={clip_icon} alt='clip icon' style={styles.clipIcon} onClick={handleIconClick} />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </label>
        <button type="submit" style={styles.buttonCreateQuestion}>Задать вопрос</button>
      </form>

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={imageUrl} alt='uploaded' style={styles.modalImage} />
            <span style={styles.closeIcon} onClick={closeModal}>✖</span>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  questionCreateForm: {
    padding: '3% 10% 0 10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  questionCreateLabel: {
    fontFamily: 'ElMessiri',
    fontSize: '30px',
    width: '100%',
  },
  labelText: {
    marginLeft: '2%',
  },
  divInput: {
    position: 'relative',
    border: '1px black solid',
    borderRadius: '10px',
  },
  textareaText: {
    margin: '1% 2% 0 2%',
    width: '95%',
    fontSize: '25px',
    fontFamily: 'AlegreyaSansSC',
    overflow: 'hidden',
    resize: 'none',
    height: 'auto',
    border: 'none',
    outline: 'none',
  },
  inputTitle: {
    margin: '1% 2% 0 2%',
    width: '95%',
    fontSize: '25px',
    fontFamily: 'AlegreyaSansSC',
    border: 'none',
    outline: 'none',
  },
  buttonCreateQuestion: {
    marginTop: '2%',
    backgroundColor: '#1058B7',
    color: '#FFFFFF',
    borderRadius: '20px',
    width: '20%',
    height: '50px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  },
  divIcon: {
    display: 'flex',
    justifyContent: 'right',
    padding: '0 1% 1% 1%',
    width: '50%',
  },
  clipIcon: {
    cursor: 'pointer',
  },
  uploadedImage: {
    width: '40px',
    height: 'auto',
    marginRight: '8px',
    cursor: 'pointer',
  },
  pCount: {
    margin: '0',
    fontSize: '15px',
  },
  divCharactersAndIcon: {
    display: 'flex',
  },
  divCharacters: {
    width: '50%',
    padding: '0 2% 1%',
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

export default CreateQuestion;
