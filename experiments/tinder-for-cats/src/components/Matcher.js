import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-use-gesture'
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

function getAction([movementX, movementY]) {
  if (movementX > 112) {
    return ACTIONS.like
  }

  if (movementX < -112) {
    return ACTIONS.nope
  }

  // if (movementY > 108) {
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
  const bind = useDrag(
    ({ event, args: [index], down, movement: [movementX, movementY] }) => {
      event.preventDefault()

      const action = getAction([movementX, movementY])
      const dir = action === ACTIONS.like ? 1 : -1

      if (!down && !!action) {
        gone.current.add(index)
      }

      set(i => {
        const isGone = gone.current.has(index)

        // Next item
        if (index === i + 1) {
          const base = Math.max(Math.abs(movementX), Math.abs(movementY))
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
          let x = down ? movementX : 0
          // TODO: Use a better check here. Probably factor in velocity.
          if (isGone) {
            x = (200 + window.innerWidth) * dir
          }

          return {
            x,
            y: down ? movementY : 0,
            scale: 1,
            // TODO: Rotate based on y.
            rotate: down ? movementX / 3 : 0,
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
    { event: { passive: false } },
  )

  return (
    <Wrapper>
      <div>
        {springs.map(({ x, y, scale, rotate }, i) => {
          const data = candidates[i]

          return (
            <Card
              {...bind(i)}
              {...data}
              as={animated.article}
              key={data.id}
              style={{
                '--like-opacity': x.interpolate(o => Math.min(o / 100, 1)),
                '--dislike-opacity': x.interpolate(o =>
                  Math.min((o * -1) / 100, 1),
                ),
                transform: interpolate(
                  [x, y, scale, rotate],
                  (transX, transY, s, r) =>
                    `translate3d(${transX}px,${transY}px,0) scale(${s}) rotate(${r /
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
