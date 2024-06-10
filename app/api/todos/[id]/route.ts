import { idParamSchema } from '@/app/validation/idParamSchema';
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
