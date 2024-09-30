import React from 'react'
import Question from '../Reusable/Question'

const PrivateOffice = () => {
  return (
    <div style={styles.privateOfficeContainer}>
        <div style={styles.name}>Алексей денисов</div>
        <button style={styles.buttonSettings}>Настройки профиля</button>
        <div style={styles.userQuestionsTitle}>МОИ ВОПРОСЫ</div>
        <Question></Question>
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