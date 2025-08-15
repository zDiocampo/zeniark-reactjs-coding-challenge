import React from 'react'
import { Link } from 'react-router-dom'
import zeniarkLogo from '../images/zeniark-logo.png'

export default function HomePage() {
  return (
    <div className="page page-home">
      <div className="page-content">
        <div className="welcome-card">
          <div className="brand-section">
            <img src={zeniarkLogo} alt="Zeniark Logo" className="logo" />
          </div>
          <div className="welcome-message">Welcome to the Trivia Challenge!</div>
          <div className="instructions">You will be presented with 10 True or False questions.</div>
          <div className="challenge-btn">Can you score 10/10?</div>
          <Link to="quiz" className="start-link">LET'S START!</Link>
        </div>
      </div>
    </div>
  )
} 
