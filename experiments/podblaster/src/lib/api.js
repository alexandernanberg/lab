import React from 'react'

const episodes = [
  {
    id: 'short',
    audio: '/audio/short.mp3',
    name: 'Shorty',
    markers: [
      {
        type: 'ad',
        start: 0,
        duration: 10,
        content: 'Do you have an angry mom?',
        link: 'https://en.wikipedia.org/wiki/Angry_Mom',
      },
      { type: 'text', start: 10, duration: 10, content: 'This is a text, yo!' },
      { type: 'image', start: 20, duration: 5, content: '/images/image01.jpg' },
      {
        type: 'ad',
        start: 30,
        duration: 10,
        content: 'Become a member of the Moth Union.',
        link: 'https://en.wikipedia.org/wiki/Nymphicula_xanthobathra',
      },
    ],
  },
  {
    id: 'long',
    audio: '/audio/long.mp3',
    name: 'Long John Silver',
    markers: [
      {
        type: 'ad',
        start: 0,
        duration: 5,
        content: 'Visit Treasure Island Today!',
        link: 'https://en.wikipedia.org/wiki/Long_John_Silver',
      },
      { type: 'image', start: 5, duration: 75, content: '/images/image02.jpg' },
      {
        type: 'ad',
        start: 80,
        duration: 15,
        content: 'Vacation at Peytons Brook!',
        link: 'https://en.wikipedia.org/wiki/Peytons_Brook',
      },
      { type: 'text', start: 100, duration: 20, content: 'Some text.' },
      { type: 'text', start: 125, duration: 5, content: 'Another text.' },
      {
        type: 'image',
        start: 140,
        duration: 10,
        content: '/images/image03.jpg',
      },
      {
        type: 'ad',
        start: 152,
        duration: 11,
        content: 'Play with Pedro!',
        link: 'https://en.wikipedia.org/wiki/Pedro_Ant%C3%B3nio_Coelho_Moreira',
      },
    ],
  },
]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getEpisodes() {
  await sleep(500)
  return episodes
}

export async function getEpisode(id) {
  await sleep(500)
  return episodes.find(episode => episode.id === id)
}

const initialState = { loading: true, error: false, data: undefined }

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { loading: true, error: false, data: undefined }
    case 'error':
      return { loading: false, error: true, data: undefined }
    case 'success':
      return { loading: false, error: false, data: action.payload }
    default:
      throw new Error()
  }
}

export function useAPI(endpoint, args) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    dispatch({ type: 'loading' })

    endpoint(args)
      .then((data) => {
        dispatch({ type: 'success', payload: data })
      })
      .catch(() => {
        dispatch({ type: 'error' })
      })
  }, [])

  return state
}
