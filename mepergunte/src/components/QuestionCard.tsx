import '../styles/questionCard.scss';
import { ReactNode } from 'react';

type Question = {
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isHighLighted: boolean,
  isAnswered: boolean,
  children?: ReactNode,
}

export function QuestionCard({ author, isAnswered, isHighLighted, children, content}: Question) {
  return (
    <div className={`question-card-container
      ${isHighLighted && !isAnswered ? 'highLighted' : ''}
      ${isAnswered ? 'answered' : ''}`}
    >
      <p>{content}</p>
      <div className="user-info">
        <div className="left-content">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="right-content">
          {children}
        </div>
      </div>
    </div>
  )
}