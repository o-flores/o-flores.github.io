import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type Question = {
  id: string,
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isHighLighted: boolean,
  isAnswered: boolean,
  likeCount: number,
  likeId: string | undefined,
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isHighLighted: boolean,
  isAnswered: boolean,
  likes: Record<string, {
    authorId: string,
  }>
}>;

export function useRoom(roomId: string) {
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [roomTitle, setRoomTitle] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions || {};
      const questionsArray = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes || {}).length,
          likeId: Object.entries(value.likes || {}).find(([key, value]) => value.authorId === user?.id)?.[0],
        }
      });
      setQuestionsList(questionsArray);
      setRoomTitle(databaseRoom.title);
    });

    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);
  return {
    questionsList,
    roomTitle,
  };
}