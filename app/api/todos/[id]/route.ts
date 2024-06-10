import { completedSchema } from '@/app/validation/completedSchema';
import { idParamSchema } from '@/app/validation/idParamSchema';
import { todoSchema } from '@/app/validation/todoSchema';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const validationResult = idParamSchema.safeParse(id);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const todo = await db.todo.findUnique({
      where: { id },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const validationResult = idParamSchema.safeParse(id);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const deletedTodo = await db.todo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const { title, description } = await req.json();
    const validationResult = todoSchema.safeParse({
      title,
      description,
      id,
    });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      return NextResponse.json(
        {
          error: errorMessage,
        },
        { status: 400 },
      );
    }

    const updatedTodo = await db.todo.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const { completed } = await req.json();

    const validationResult = completedSchema.safeParse({ completed });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0].message;
      return NextResponse.json({ error: errorMessage });
    }

    const updatedTodo = await db.todo.update({
      where: { id },
      data: { completed },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
