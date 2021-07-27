import { FormEvent } from 'react';
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import illustrationImg from '../images/illustration.svg';
import googleLogo from '../images/google-icon.svg'
import '../styles/auth.scss';
import { useState } from 'react';
import { database } from '../services/firebase';


export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomId, setRoomId] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/room/new');
  }

  async function handleJoinRoom(event:FormEvent) {
    event.preventDefault();

    if(roomId.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomId}`).get();

    if (!roomRef.exists()) {
      alert('Esta sala não existe.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Esta sala foi encerrada.');
      return;
    }

    history.push(`/rooms/${roomId}`)

  }

  return (
    <div id="auth-page">
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Faça sua pergunta</strong>
        <p>Tire suas dúvidas em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <button
            className="btn-create-room"
            onClick={handleCreateRoom}
          >
            <img src={googleLogo} alt="Google Logo" />
            Entre com o google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              onChange={({ target }) => setRoomId(target.value)}
              value={roomId}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala!
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}