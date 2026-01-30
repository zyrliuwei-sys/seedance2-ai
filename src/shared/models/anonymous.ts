import { eq } from 'drizzle-orm';
import { db } from '@/core/db';
import { anonymousUsage } from '@/config/db/schema';

/**
 * Check if an anonymous user has used their free generation
 */
export async function checkAnonymousUsage(anonymousId: string): Promise<boolean> {
  try {
    const records = await db()
      .select()
      .from(anonymousUsage)
      .where(eq(anonymousUsage.id, anonymousId))
      .limit(1);

    return records.length > 0;
  } catch (error) {
    console.error('Error checking anonymous usage:', error);
    return false;
  }
}

/**
 * Record that an anonymous user has used their free generation
 */
export async function recordAnonymousUsage(anonymousId: string): Promise<void> {
  try {
    await db().insert(anonymousUsage).values({
      id: anonymousId,
      usedAt: new Date(),
    });
  } catch (error) {
    console.error('Error recording anonymous usage:', error);
  }
}
