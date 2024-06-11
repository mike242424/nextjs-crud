'use client';

import { Todo } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await axios.get('http://localhost:3000/api/todos');
        setTodos(res.data);
      } catch (error) {
        setError('Error fetching todos');
      } finally {
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

const TodoItem = ({ todo }: { todo: Todo }) => (
  <Link href={`/todos/${todo.id}`}>
    <div>{todo.title}</div>
    <div>{todo.description}</div>
    <div>{todo.completed === true ? 'completed' : 'not completed'}</div>
  </Link>
);

export default Todos;
