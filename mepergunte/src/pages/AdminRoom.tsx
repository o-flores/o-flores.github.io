import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { QuestionCard } from '../components/QuestionCard';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from "../hooks/useAuth";
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';
import deleteIcon from '../images/delete.svg';
import checkIcon from '../images/check.svg'
import answerIcon from '../images/answer.svg'
import { database } from "../services/firebase";
import { useHistory } from 'react-router-dom';

type RoomParams = {
  id: string;
}


export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questionsList, roomTitle } = useRoom(roomId);

  async function handleDeleteQuestion(id: string) {
    if (window.confirm('Deseja excluir a pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${id}`).remove();
    }
  }

  async function handleDeleteRoom() {
    if (window.confirm("Deseja excluir a sala?")) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
      history.push('/mepergunte');
    }
  }

  async function handleHighLightedQuestion(id: string) {
    await database
      .ref(`rooms/${roomId}/questions/${id}/isHighLighted`)
      .transaction((value) => !value);
  }

  async function handleSetQuestionAsAnswered(id: string) {
    await database.ref(`rooms/${roomId}/questions/${id}`).update({
      isAnswered: true,
    });
    // await database.ref(`rooms/${roomId}/questions/`).orderByChild('/isAnswered');
  }

  return (
    <div id="room-page">
      <header>
        <p>LOGO</p>
        <div>
          <RoomCode code={roomId} />
          <Button onClick={handleDeleteRoom}>Encerrar Sala</Button>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>{roomTitle}</h1>
          {questionsList.length > 0 && <span>{`${questionsList.length} pergunta(s)`}</span>}
        </div>
        {questionsList.map((question) => (
          <QuestionCard
            key={question.id}
            {...question}
          >
            {!question.isAnswered && (
              <>
                <button
                  className="check-button"
                  type="button"
                  onClick={() => handleSetQuestionAsAnswered(question.id)}
                >
                  <img src={checkIcon} alt="Check icon" />
                </button>
                <button
                  className="answer-button"
                  type="button"
                  onClick={() => handleHighLightedQuestion(question.id)}
                >
                  <img src={answerIcon} alt="Answer icon" />
                </button>
              </>
            )}
            <button
              className="delete-button"
              type="button"
              onClick={() => handleDeleteQuestion(question.id)}
            >
              <img src={deleteIcon} alt="Delete icon" />
            </button>
          </QuestionCard>
        ))}
      </main>
    </div>
  );
}