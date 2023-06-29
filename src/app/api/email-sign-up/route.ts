import { NextRequest, NextResponse } from "next/server";

export const revalidate = false;

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { email } = data;
  return NextResponse.json({
    message: `You have been subscribed to the newsletter with the email address ${email}`,
  });
}
