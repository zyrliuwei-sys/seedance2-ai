import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/core/db';
import { user } from '@/config/db/schema';
import { eq } from 'drizzle-orm';
import { grantCreditsForUser } from '@/shared/models/credit';
import { getUuid } from '@/shared/lib/hash';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, credits, description } = body;

    if (!email || !credits) {
      return NextResponse.json(
        { error: 'Email and credits are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const users = await db()
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const targetUser = users[0];

    // Grant credits
    await grantCreditsForUser({
      user: targetUser,
      credits: credits,
      validDays: 0, // Never expires
      description: description || 'Admin grant credits',
    });

    return NextResponse.json({
      success: true,
      message: `Granted ${credits} credits to ${email}`,
      userId: targetUser.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to grant credits' },
      { status: 500 }
    );
  }
}
