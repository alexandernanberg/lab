import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  > span {
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px 16px;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--dark);
    background: var(--yellow);
  }

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default function Marker({ data }) {
  if (!data) {
    return null
  }

  switch (data.type) {
    case 'image':
      return (
        <Wrapper>
          <img src={data.content} alt="" />
        </Wrapper>
      )
    case 'ad':
      return (
        <Wrapper>
          <span>Advertisment</span>
          <h3>{data.content}</h3>
          <p>
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              {data.link} →
            </a>
          </p>
        </Wrapper>
      )
    case 'text':
      return (
        <Wrapper>
          <h3>{data.content}</h3>
        </Wrapper>
      )
    default:
      return null
  }
}
