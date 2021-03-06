import React from 'react'
import { Router, Redirect } from '@reach/router'
import GlobalStyle from './components/GlobalStyle'
import Episode from './pages/Episode'
import EpisodeList from './pages/EpisodeList'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <EpisodeList path="/" />
        <Redirect from="/episodes" to="/" noThrow />
        <Episode path="/episodes/:episodeId" />
        <NotFound default />
      </Router>
    </>
  )
}
