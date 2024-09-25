/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Mock upload API called", request);

  const mockResponse = {
    text: "This is a mocked API response for local development. In production, this would be the result of processing the uploaded file.",
    embedId: "mock-embed-id-123"
  };

  return NextResponse.json(mockResponse);
}