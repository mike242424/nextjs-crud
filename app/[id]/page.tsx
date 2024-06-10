'use client';

import { Todo } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TodoView = ({ params: { id } }: { params: { id: string } }) => {
  const [todo, setTodo] = useState<Todo>();

  useEffect(() => {
    async function getTodo() {
      const response = await axios.get(`http://localhost:3002/api/todos/${id}`);

      setTodo(response.data);
    }

    getTodo();
  }, [id]);
  return (
    <div>
      <div>{todo?.title}</div>
      <div>{todo?.description}</div>
      <div>{todo?.completed === true ? 'completed' : 'not completed'}</div>
    </div>
  );
};

export default TodoView;
