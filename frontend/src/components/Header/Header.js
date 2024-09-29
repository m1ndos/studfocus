import React from 'react'
import logo_header from '../../assets/logo_header.svg'
import private_office_icon from '../../assets/private_office_icon.svg'

const Header = () => {
  return (
    <div style={styles.header}>
        <img src={logo_header} style={styles.logoHeader}></img>
        <div style={styles.textHeader}>
            <div style={styles.studfocus}>СТУДФОКУС</div>
            <div style={styles.otherText}>платформа, для тех, кто строит образовательное будущее</div>
        </div>
        <div style={styles.containerPrivateOfficeIcon}>
            <img src={private_office_icon} style={styles.private_office_icon}></img>
        </div>
    </div>
  )
}

const styles = {
    header: {
        width: '100%',
        height: '110px',
        backgroundColor: '#1058B7',
        display: 'flex',
        alignItems: 'center'
    },
    logoHeader: {
        cursor: 'pointer',
        width:'6%',
        marginLeft: "4%"
    },
    textHeader: {
        width: '80%',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    studfocus: {
        fontFamily: 'AlegreyaSansSC extrabold',
        letterSpacing: '20px',
        fontWeight: "bold",
        color: 'white',
        fontSize: '40px'
    },
    otherText: {
        color: 'white',
        fontFamily: 'ElMessiri',
        fontSize: '30px'
    },
    containerPrivateOfficeIcon: {
        width: '10%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: "flex-end"
    },
    private_office_icon: {
        width: '50px',
        marginRight: '15px',
        marginBottom: '15px',
        cursor: 'pointer'
    }
}


export default Header