import React from 'react';

const QuizContent = (props) => {
  return (
    <div>
      {props.quiz.map((question, i) => {
      return (
        <div>
          <h2>{`Câu hỏi ${i+1}`}</h2>
          {question.map((answer) => {
            return (<div>{answer}</div>)
          })}
        </div>
      )
    })}
    </div>
  )
}

export default QuizContent