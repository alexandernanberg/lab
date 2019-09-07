import React from 'react'

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

export default function useFetch(args) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    dispatch({ type: 'loading' })

    fetch(args)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'success', payload: data })
      })
      .catch(() => {
        dispatch({ type: 'error' })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(args)])

  return state
}
