import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import useUserScores from '../../lib/useUserScores'

const GolferPage = () => {

  const [ user, setUser ] = useState({})
  const [ scores, setScores ] = useState([])
  const route = useRouter()
  const { id } = route.query
  const { data, error } = useUserScores(id)

  useEffect(() => {
    if (data){
      setUser(data.user)
      setScores(data.scores)
    }
  }, [ data ])

  if (!data && !error){
    return <p>Loading...</p>
  }

  return (
    <Layout>
      { error ? (
        error.info.errors
      ) : (
        user.name && (
          <>
            <h1> The scores of user {user.name}: </h1>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={user.name}
                showUserLink={true}
              />
            ))}
          </>
        )
      )}
    </Layout>
  )
}

export default GolferPage
