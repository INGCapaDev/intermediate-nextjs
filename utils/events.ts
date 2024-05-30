import { db } from '@/db/db'
import { events } from '@/db/schema'
import { and, asc, eq } from 'drizzle-orm'
import { memoize } from 'nextjs-better-unstable-cache'
import { delay } from './delay'

export const getEventsForDashboard = memoize(
  async (userId: string) => {
    await delay()

    const data = await db.query.events.findMany({
      where: eq(events.createdById, userId),
      columns: {
        id: true,
        name: true,
        startOn: true,
        status: true,
      },
      with: {
        rsvps: true,
      },
      limit: 5,
      orderBy: [asc(events.startOn)],
    })
    return data ?? []
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:events'],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'dashboard:events',
  }
)

export const getAllEvents = memoize(
  async (userID: string) => {
    await delay()

    const data = await db.query.events.findMany({
      where: eq(events.createdById, userID),
      orderBy: [asc(events.startOn)],
    })
    return data ?? []
  },
  {
    persist: true,
    revalidateTags: () => ['events'],
  }
)

export const getEventById = memoize(
  async (userID: string, eventID: string) => {
    await delay()
    return db.query.events.findFirst({
      where: and(eq(events.id, eventID), eq(events.createdById, userID)),
    })
  },
  {
    persist: true,
    revalidateTags: (_, eventID) => [`events`, eventID],
  }
)
