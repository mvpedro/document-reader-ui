import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock response
  const mockResponse = {
    text: "This is a mocked API response for local development. In production, this would be the result of processing the uploaded file."
  };

  return NextResponse.json(mockResponse);
}