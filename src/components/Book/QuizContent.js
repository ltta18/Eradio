import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion } from 'api/Action/Book/Question';
import Loading from 'components/Common/Loading';

const QuizContent = (props) => {
  const [ answerSet, setAnswerSet ] = useState({})

  const [ question, setQuestion ] = useState([])

  const [ correctAnswer, setCorrectAnswer ] = useState([])

  const [ possibleAnswerSet, setPossibleAnswerSet ] = useState([])
  
  const location = useLocation()
  const dispatch = useDispatch()
  const token = useSelector(state => state.access_token)

  useEffect(() => {
    const getQuestion = async() => {
      const book_id = location.pathname.split('/')[3]
      const question = await dispatch(fetchQuestion(book_id, token));
      question.data.questions.map((q, i) => {
        setCorrectAnswer(prevState => [...prevState, q.correct_answer])
        setQuestion(prevState => [...prevState, q.question])
        setPossibleAnswerSet(prevState => [...prevState, q.answers])
      })
    }

    if (location.pathname.split('/')[2] === 'question') getQuestion()
  }, [])

  useEffect(() => {
    localStorage.setItem('answerSet', JSON.stringify(answerSet))
  }, [answerSet])

  useEffect(() => {
    localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer))
  }, [correctAnswer])
  
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
      [questionId]:answerId+1
    }))
  }

  const getResult = () => {
    const answerSet = JSON.parse(localStorage.getItem('answerSet'))
    const correctAnswer = JSON.parse(localStorage.getItem('correctAnswer'))
    var numCorrect = 0
    for (var i=0; i<5; i++) {
      if (answerSet[i] === correctAnswer[i]) {
        numCorrect += 1
      }
    }
    return String(numCorrect)
    
  }

  const getContent = () => {
    if (location.pathname.split('/')[2] === 'result') {
      return (
        <div className="text-center">
          <div>Chúc mừng bạn đã hoàn thành phần câu hỏi trắc nghiệm.</div>
          <div>Kết quả của bạn là: {`${getResult()}/5`}</div>
        </div>
      )}
    else {
      if (!!question[4] && !!possibleAnswerSet[4]) {
      return (
        question.map((q, i) => {
          return (
            <div>
              <h2>{`Câu hỏi ${i+1}: ${q}`}</h2>
              {possibleAnswerSet[i].map((answer, j) => {
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
  }
             
  return (
    <div>
      {getContent()}
    </div>
  )
}

export default QuizContent