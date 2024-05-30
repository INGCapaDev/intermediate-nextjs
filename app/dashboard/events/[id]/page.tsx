import { getEventById } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import { redirect } from 'next/navigation'
import React from 'react'

const EventDetailPage: React.FC<any> = async ({ params }) => {
  const user = await getCurrentUser()
  const event = await getEventById(user.id, params.id)

  if (!event) redirect('/dashboard/events')
  return (
    <div>
      <h1>Event Detail Page</h1>
      <span>{event.name}</span>
    </div>
  )
}

export default EventDetailPage
