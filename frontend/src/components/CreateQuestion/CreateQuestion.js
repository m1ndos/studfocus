import React, { useState } from 'react';
import clip_icon from '../../assets/clip_icon.svg';

const CreateQuestion = () => {
  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const MAX_TITLE_LENGTH = 100;
  const MAX_TEXT_LENGTH = 300;

  // Функция для изменения заголовка
  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  // Функция для автоматического изменения высоты textarea и обновления текста
  const handleTextChange = (e) => {
    setTextValue(e.target.value);
    e.target.style.height = 'auto'; // Сбрасываем высоту
    e.target.style.height = e.target.scrollHeight + 'px'; // Устанавливаем новую высоту
  };

  return (
    <div>
      <form style={styles.questionCreateForm}>
        <label style={styles.questionCreateLabel}>
          Заголовок
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
          Текст
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
                <img src={clip_icon} alt='clip icon' style={styles.clipIcon} />
              </div>
            </div>
          </div>
        </label>
        <button style={styles.buttonCreateQuestion}>Задать вопрос</button>
      </form>
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
};

export default CreateQuestion;
