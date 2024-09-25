import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { message, embedId } = await request.json();

  const response = `Recebi sua mensagem "${message}" para o documento ${embedId}. Este é um exemplo de resposta.`;

  return NextResponse.json({ response });
}