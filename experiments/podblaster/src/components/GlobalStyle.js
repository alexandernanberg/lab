import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

const CustomGlobalStyle = createGlobalStyle`  
  :root {
    --system-ui: -apple-system, BlinkMacSystemFont,
    “Segoe UI”, “Roboto”, “Oxygen”,
    “Ubuntu”, “Cantarell”, “Fira Sans”,
    “Droid Sans”, “Helvetica Neue”, sans-serif;

    /* Colors */
    --yellow: #f9c133;
    --gray: #323232;
    --dark: #252525;
  }

  html {
    font-size: 16px;
    font-family: var(--system-ui);
    -webkit-font-smoothing: antialiased;
  }

  html, body {
    height: 100%;
    overflow: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`

export default function GlobalStyle() {
  return (
    <>
      <Normalize />
      <CustomGlobalStyle />
    </>
  )
}
