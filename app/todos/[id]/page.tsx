'use client';

import { Todo } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TodoView = ({ params: { id } }: { params: { id: string } }) => {
  const [todo, setTodo] = useState<Todo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getTodo() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/todos/${id}`,
        );
        setTodo(response.data);
      } catch (error) {
        setError('Failed to fetch todo item');
      } finally {
        setLoading(false);
      }
    }

    getTodo();
  }, [id]);

  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      router.push('/todos');
    } catch (error) {
      setError('Failed to delete todo item');
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>{todo?.title}</div>
      <div>{todo?.description}</div>
      <div>{todo?.completed === true ? 'completed' : 'not completed'}</div>
      <button onClick={handleDelete} className="bg-red-500 p-4">
        Delete
      </button>
    </div>
  );
};

export default TodoView;
