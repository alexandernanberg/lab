import React from 'react'
import { Link } from '@reach/router'
import { useAPI, getEpisodes } from '../lib/api'

export default function EpisodeList() {
  const { loading, error, data } = useAPI(getEpisodes)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>An error occured</div>
  }

  return (
    <>
      <h1>Podblaster</h1>
      <ul>
        {data.map(episode => (
          <li key={episode.id}>
            <Link to={`/episodes/${episode.id}`}>{episode.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
