import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const QuizContent = (props) => {
  const [ answerSet, setAnswerSet ] = useState({1: undefined, 2: undefined, 3: undefined,
                                                4: undefined, 5: undefined})

  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('answerSet', JSON.stringify(answerSet))
  }, [answerSet])
  
  const handleClickAnswer = (e) => {
    var id = e.target.id
    var questionId = Number(id.substring(8,9))
    var answerId = Number(id.substring(16,17))
    var clickedAnswer = document.getElementsByClassName(`question${questionId}`)
    for (var i=0; i<clickedAnswer.length; i++) {
      if (i === answerId) {
        clickedAnswer.item(i).classList.add('current-read-button')
        clickedAnswer.item(i).classList.remove('not-yet-read-button')
      }
      else {
        clickedAnswer.item(i).classList.remove('current-read-button')
        clickedAnswer.item(i).classList.add('not-yet-read-button')
      }
    }

    setAnswerSet(prevState => ({
      ...prevState,
      [questionId]:answerId
    }))
  }

  const getContent = () => {
    if (location.pathname.substring(16,23) === 'result') {
      return (
        <div className="text-center">
          <div>Chúc mừng bạn đã hoàn thành phần câu hỏi trắc nghiệm.</div>
          <div>Kết quả của bạn là:</div>
          <div></div>
        </div>
      )}
    else {
      return (
        props.quiz.map((question, i) => {
          return (
            <div>
              <h2>{`Câu hỏi ${i+1}`}</h2>
              {question.map((answer, j) => {
                return (
                <div id={`question${i}-answer${j}`} className="show-flex" style={{marginBottom: '3px'}} onClick={handleClickAnswer}>
                  <div id={`question${i}-answer${j}-button`} className={`chapter-status-button not-yet-read-button answer question${i}`}></div>
                  {answer}
                </div>)
              })}
            </div>
          )
        })
      )
    }
  }
             
  return (
    <div>
      {getContent()}
    </div>
  )
}

export default QuizContent