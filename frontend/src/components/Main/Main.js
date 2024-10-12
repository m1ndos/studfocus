import React from 'react'
import search_icon from '../../assets/search_icon.svg'

const Main = () => {
  return (
    <div>
        <div style={styles.divCreateQuestion}>
            <button style={styles.btnCreateQuestion}>Задать вопрос</button>
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
    }
}

export default Main