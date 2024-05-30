import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'
import { getUserFromToken } from './authTools'
import { COOKIE_NAME } from './constants'

export const getCurrentUser = async () => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) return redirect('/signin')
  const user = await getUserFromToken(token)
  if (!user) return redirect('/signin')
  return user
}
