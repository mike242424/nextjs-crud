import { todoSchema } from '@/app/validation/todoSchema';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    const validationResult = todoSchema.safeParse({ title, description });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const todo = await db.todo.create({
      data: { title, description },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const todos = await db.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
