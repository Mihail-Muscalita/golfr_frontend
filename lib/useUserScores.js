import useSWR from 'swr'
import { getToken } from './userAuth'

export const SCORES_URL = userId => `${process.env.NEXT_PUBLIC_API_URL}/scores/${userId}`

const useUserScores = userId => {

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok){
      const error = new Error('An error occured while fetching the data for this user')

      error.info = await res.json()
      error.status = res.status
      throw error
    }

    return res.json()
  }
  const { data, error } = useSWR(userId ? SCORES_URL(userId) : null, fetcher)

  return { data, error }
}

export default useUserScores
