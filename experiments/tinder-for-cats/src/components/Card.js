import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.article`
  --like-opacity: 0;
  --dislike-opacity: 0;
  position: relative;
  z-index: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  background: white;
  will-change: transform;
  cursor: grab;
  user-select: none;
  touch-action: manipulation;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:active {
    cursor: grabbing;
  }

  & figure {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  & header {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32px 24px 24px;
    color: white;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  }

  & h1 {
    margin: 0 0 0.1em;
    font-size: 1.8rem;
  }

  & small {
    font-weight: normal;
  }

  & p {
    margin: 0;
    font-size: 1.1rem;
  }

  & [data-like],
  & [data-dislike] {
    position: absolute;
    top: 0;
    border: solid 4px var(--color);
    display: inline-block;
    padding: 10px;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    color: var(--color);
  }

  & [data-like] {
    --color: #07b536;
    left: 0;
    transform: translateX(20px) translateY(30px) rotateZ(-15deg);
    opacity: var(--like-opacity);
  }

  & [data-dislike] {
    --color: #d43333;
    right: 0;
    transform: translateX(-20px) translateY(30px) rotateZ(15deg);
    opacity: var(--dislike-opacity);
  }
`

export function Card({ name, image, city, age, ...props }, ref) {
  return (
    <Wrapper ref={ref} {...props}>
      <div data-like>Like</div>
      <div data-dislike>Nope</div>
      <figure>
        <img src={image} alt="" draggable={false} />
      </figure>
      <header>
        <h1>
          {name} <small>{age}</small>
        </h1>
        <p>{city}</p>
      </header>
    </Wrapper>
  )
}

export default React.forwardRef(Card)
