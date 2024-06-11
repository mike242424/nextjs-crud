'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { todoSchema } from './validation/todoSchema';

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const router = useRouter();

  async function onSubmit(data: FieldValues) {
    const response = await axios.post(`http://localhost:3000/api/todos`, {
      title: data.title,
      description: data.description,
    });
    reset();
    router.push('/todos');
  }
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Link className="bg-blue-500 p-4 rounded" href={'/todos'}>
        Todos
      </Link>
      <form
        className="flex flex-col w-6/12 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="p-3 border border-blue-500 rounded"
          {...register('title')}
          type="text"
          placeholder="Title"
        />
        {errors?.title && (
          <p className="text-red-500">{errors.title?.message}</p>
        )}
        <input
          className="p-3 border border-blue-500 rounded"
          {...register('description')}
          type="text"
          placeholder="Description"
        />
        {errors?.description && (
          <p className="text-red-500">{errors?.description.message}</p>
        )}
        <button
          className="bg-blue-500 p-3 rounded"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Home;
