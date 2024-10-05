import React from 'react'
import like_icon from '../../assets/like_icon.svg'

const Comment = ({ comment }) => {
  return (
    <div style={styles.commentContainer}>
      <div style={styles.autor}>{comment.autor}</div>
      <div style={styles.date}>{comment.date}</div>
      <div style={styles.text}>{comment.text}</div>
      <div style={styles.divLikes}>
        <img src={like_icon} alt='like_icon' style={styles.likeIcon}></img>
        <p style={styles.likeCount}>{comment.likes_count}</p>
      </div>
    </div>
  )
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
  }
}

export default Comment