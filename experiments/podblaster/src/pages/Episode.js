import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import { useAPI, getEpisode } from '../lib/api'
import Player from '../components/Player'

const Wrapper = styled.div`
  width: 100vw;
  max-width: 600px;

  > a {
    display: inline-block;
    margin-bottom: 24px;
  }
`

export default function Episode({ episodeId }) {
  const { loading, error, data } = useAPI(getEpisode, episodeId)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>An error occured</div>
  }

  return (
    <Wrapper>
      <Link to="..">← Back</Link>
      <Player src={data.audio} title={data.name} markers={data.markers} />
      <h1>{data.name}</h1>
    </Wrapper>
  )
}
