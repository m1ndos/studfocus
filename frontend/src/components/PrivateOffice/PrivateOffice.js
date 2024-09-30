import React from 'react'
import Question from '../Reusable/Question'

const PrivateOffice = () => {

    const params = [
        {
            title: 'Какие профессии самые восстребованные в 2025 году?',
            text: 'Ни один из прогнозов востребованности профессий не обходится без упоминания IT-сферы. Компьютеризация, которую мы в нашей стране стали замечать только в начале нулевых, идёт быстрыми темпами – и не собирается останавливаться. Не за горами те дни, когда системы «умного дома» и эффективные распознаватели речи (голосовое управление технологическими устройствами) станут обыденной реальностью – такой же, как лифты, мобильные телефоны, холодильники...',
            autor: 'Иванов Д.',
            views: '156 876',
            comments: '698',
            date: '20.09.2024'
        },
        {
            title: '1',
            text: '2',
            autor: '3',
            views: '4',
            comments: '4',
            date: '1'
        },
        {
            title: '1',
            text: '2',
            autor: '3',
            views: '4',
            comments: '4',
            date: '1'
        },
        {
            title: '1',
            text: '2',
            autor: '3',
            views: '4',
            comments: '4',
            date: '1'
        },
        {
            title: '1',
            text: '2',
            autor: '3',
            views: '4',
            comments: '4',
            date: '1'
        },
    ]

  return (
    <div style={styles.privateOfficeContainer}>
        <div style={styles.name}>Алексей Денисов</div>
        <button style={styles.buttonSettings}>Настройки профиля</button>
        <div style={styles.userQuestionsTitle}>МОИ ВОПРОСЫ</div>
        {params.map((question, index) => (
            <Question key={index} params={question} />
        ))}
    </div>
  )
}

const styles = {
    privateOfficeContainer: {
        padding: "5% 10% 2% 10%"
    },
    name: {
        fontFamily: 'ElMessiri',
        fontSize: '30px',
        fontWeight: 'bold'
    },
    buttonSettings: {
        background: 'none',
        border: 'none',
        textAlign: 'left',
        padding: '0',
        cursor: 'pointer',
        color: '#1058B7',
        fontFamily: 'AlegreyaSansSC-Regular',
        fontSize: '22px'
    },
    userQuestionsTitle: {
        textAlign: 'center',
        fontFamily: 'ElMessiri',
        color: '#1058B7',
        fontSize: '30px',
        paddingTop: '2%',
        paddingBottom: '1%'
    },
    questionContainer: {
        backgroundColor: '#CBCBCB'
    }
}

export default PrivateOffice