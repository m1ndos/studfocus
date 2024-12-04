import React, { useState, useEffect } from 'react'
import search_icon from '../../assets/search_icon.svg'
import { useNavigate } from 'react-router-dom'; 
import Question from '../Reusable/Question'; // Импортируем компонент Question

const Main = () => {

    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    const fetchAllQuestions = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/questions', {
                method: 'GET',
            });

            const data = await response.json();

            if (response.ok) {
                // После получения вопросов, рассчитываем коэффициент популярности
                const questionsWithPopularity = data.questions.map(question => ({
                    ...question,
                    popularityScore: question.views_count * 0.1 + question.comments_count * 0.2, // Рассчитываем популярность
                }));
                // Сортируем вопросы по популярности от большего к меньшему
                const sortedQuestions = questionsWithPopularity.sort((a, b) => b.popularityScore - a.popularityScore);

                // Обновляем состояние с отсортированными вопросами
                setQuestions(sortedQuestions);
            } else {
                console.log('Ошибка:', data.message);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    useEffect(() => {
        fetchAllQuestions();
    }, [])

    const handleCreateQuestionClick = () => {
        navigate('/create-question')
    }

    // Обработчик для перехода на страницу конкретного вопроса
    const handleQuestionClick = (id) => {
        navigate(`/question/${id}`); // Навигация на страницу вопроса с его id
    };

  return (
    <div>
        <div style={styles.divCreateQuestion}>
            <button style={styles.btnCreateQuestion} onClick={handleCreateQuestionClick}>Задать вопрос</button>
        </div>
        <div style={styles.divSearch}>
            <div style={styles.search}>
                <label style={styles.labelSearch}>
                    <input style={styles.inputSearch}></input>
                </label>
                <img src={search_icon} alt='search_icon' style={styles.imgSearch}></img>
            </div>
        </div>
        
        <div style={styles.divTextFamousQuestions}>
            <p style={styles.pTextFamousQuestions}>ПОПУЛЯРНЫЕ ВОПРОСЫ</p>
        </div>

        {/* Рендеринг списка вопросов */}
        <div style={styles.questionsList}>
            {questions.map((question) => (
                <Question key={question._id} question={question} onClick={() => handleQuestionClick(question._id)} />
            ))}
        </div>
    </div>
  )
}

const styles = {
    divCreateQuestion: {
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        padding: '2%'
    },
    btnCreateQuestion: {
        width: '15%',
        padding: '1% 0% 1% 0',
        borderRadius: '25px',
        border: 'none',
        backgroundColor: '#1058B7',
        color: 'white',
        fontSize: '23px',
        fontFamily: 'AlegreyaSansSC-Medium',
        cursor: 'pointer'
    },
    divSearch: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    search: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        height: '50px',
        borderRadius: '10px'
    },
    labelSearch: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    inputSearch: {
        width: '95%',
        fontSize: '25px',
        fontFamily: 'AlegreyaSansSC-Regular',
        border: 'none',
        outline: 'none'
    },
    imgSearch: {
        width: '50px',
        cursor: 'pointer',
        marginRight: '1.5%'
    },
    divTextFamousQuestions: {
        display: 'flex',
        justifyContent: 'center',
        width: '80%',
        borderBottom: '2px solid #1058B7',
        margin: '10px auto',
        fontSize: '30px',
        color: '#1058B7',
        fontFamily: 'ElMessiri-Medium'
    },
    pTextFamousQuestions: {
        margin: '2%'
    },
    questionsList: {
        padding: '2% 10% 2% 10%'
        
    }
}

export default Main;
