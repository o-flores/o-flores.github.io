import { FormEvent, useState } from 'react';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../images/illustration.svg';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);


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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              onChange={({ target }) => setNewRoom(target.value)}
              value={newRoom}
              type="text"
              placeholder="Código da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/mepergunte">Clique aqui</Link></p>
        </div>
      </main>
    </div >
  )
}