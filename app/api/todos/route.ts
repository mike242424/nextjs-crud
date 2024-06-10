import { postTodoSchema } from '@/app/validation/postTodoSchema';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    const validationResult = postTodoSchema.safeParse({ title, description });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const todo = await db.todo.create({
      data: { title, description },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
