import React, { useRef } from 'react'
import styled from 'styled-components'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'
import Card from './Card'
import candidates from '../data/candidates.json'

const Wrapper = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 450px;

  > div {
    position: relative;
    height: 0;
    padding-bottom: 156.25%;

    > * {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`

const ACTIONS = {
  nope: 0,
  like: 1,
  superlike: 2,
}

function getAction([deltaX, deltaY]) {
  if (deltaX > 112) {
    return ACTIONS.like
  }

  if (deltaX < -112) {
    return ACTIONS.nope
  }

  // if (deltaY > 108) {
  //   return ACTIONS.superlike
  // }

  return null
}

export default function Matcher() {
  const gone = useRef(new Set())
  const [springs, set] = useSprings(candidates.length, i => ({
    x: 0,
    y: 0,
    scale: i === candidates.length - 1 ? 1 : 0.95,
    rotate: 0,
  }))
  const bindGesture = useGesture({
    passive: { passive: false },
    onDrag: ({ event, args: [index], down, delta: [deltaX, deltaY] }) => {
      event.preventDefault()

      const action = getAction([deltaX, deltaY])
      const dir = action === ACTIONS.like ? 1 : -1

      if (!down && !!action) {
        gone.current.add(index)
      }

      set(i => {
        const isGone = gone.current.has(index)

        // Next item
        if (index === i + 1) {
          const base = Math.max(Math.abs(deltaX), Math.abs(deltaY))
          let scale = down ? Math.min(base / 6000 + 0.95, 1) : 0.95
          if (isGone) {
            scale = 1
          }
          return {
            scale,
          }
        }

        // Current item
        if (index === i) {
          let x = down ? deltaX : 0
          if (isGone) {
            x = (200 + window.innerWidth) * dir
          }

          return {
            x,
            y: down ? deltaY : 0,
            scale: 1,
            rotate: down ? deltaX / 3 : 0,
            immediate: down,
          }
        }

        return undefined
      })

      // Reset
      if (!down && gone.current.size === candidates.length) {
        setTimeout(() => {
          gone.current.clear()
          set(i => ({
            x: 0,
            y: 0,
            scale: i === candidates.length - 1 ? 1 : 0.95,
            rotate: 0,
          }))
        }, 600)
      }
    },
  })

  return (
    <Wrapper>
      <div>
        {springs.map(({ x, y, scale, rotate }, i) => {
          return (
            <Card
              {...bindGesture(i)}
              {...candidates[i]}
              as={animated.article}
              key={i}
              style={{
                '--like-opacity': x.interpolate(o => Math.min(o / 100, 1)),
                '--dislike-opacity': x.interpolate(o =>
                  Math.min((o * -1) / 100, 1),
                ),
                transform: interpolate(
                  [x, y, scale, rotate],
                  (x, y, s, r) =>
                    `translate3d(${x}px,${y}px,0) scale(${s}) rotate(${r /
                      10}deg)`,
                ),
              }}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}
