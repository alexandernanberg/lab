/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import { ControlBar, ControlButton, Timeline, Hero } from './style'
import formatTime from '../../lib/formatTime'
import { IconPlay, IconPause, IconRewind, IconForward } from '../Icon'
import Marker from './Marker'
import isBetween from '../../lib/isBetween'

export default function Player({ src, title, markers }) {
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [activeMarkerIndex, setActiveMarkerIndex] = React.useState(-1)
  const audioRef = React.useRef(null)
  const progress = (currentTime / duration) * 100
  const formattedCurrentTime = formatTime(currentTime)
  const formattedDuration = formatTime(duration)

  // Update player currentTime
  React.useEffect(() => {
    // TODO: There is probably a better way to check if we should update the
    // audio.currentTime. Maybe like a isSeeking flag.
    if (
      audioRef.current &&
      Math.floor(audioRef.current.currentTime) !== Math.floor(currentTime)
    ) {
      audioRef.current.currentTime = currentTime
    }
  }, [currentTime])

  // Update player playing state
  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Update active marker
  React.useEffect(() => {
    if (isPlaying || currentTime !== 0) {
      // TODO: This should be done in a more effective way. Currently we loop
      // thorugh the entire markers array every time currentTime changes, this
      // might the expensive if the podcast is long and have a lot of markers.
      const nextActiveMarkerIndex = markers.findIndex((m) => {
        return isBetween(currentTime, m.start, m.start + m.duration)
      })

      setActiveMarkerIndex(nextActiveMarkerIndex)
    }
  }, [currentTime, isPlaying])

  function onTimeUpdate({ target }) {
    setCurrentTime(target.currentTime || 0)
    setDuration(target.duration || 0)
  }

  function rewind(seek = -5) {
    setCurrentTime(t => Math.max(0, t + seek))
  }

  function forward(seek = 5) {
    setCurrentTime(t => Math.min(duration, t + seek))
  }

  function togglePlay() {
    setIsPlaying(state => !state)
  }

  return (
    <>
      <Hero>
        {activeMarkerIndex !== -1 && (
          <Marker data={markers[activeMarkerIndex]} />
        )}
      </Hero>
      <Timeline style={{ '--progress': `${progress}%` }}>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.01"
          value={currentTime}
          aria-valuemin="0"
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-valuetext={`${formattedCurrentTime} of ${formattedDuration}`}
          onChange={(event) => {
            // TODO: Fix a bug when this fires right after rewind/forward which
            // overwrites that action.
            // TODO: Probably better to pause playback while seeking.
            setCurrentTime(Number(event.target.value))
          }}
          onKeyDown={(event) => {
            switch (event.key) {
              case 'ArrowRight':
              case 'ArrowUp':
                event.preventDefault()
                forward()
                break

              case 'ArrowLeft':
              case 'ArrowDown':
                event.preventDefault()
                rewind()
                break

              case 'End':
                event.preventDefault()
                setCurrentTime(duration)
                break

              case ' ':
                event.preventDefault()
                togglePlay()
                break

              default:
                break
            }
          }}
        />
      </Timeline>
      <ControlBar>
        <ControlButton type="button" onClick={() => rewind()}>
          <IconRewind />
        </ControlButton>
        <ControlButton
          type="button"
          aria-pressed={isPlaying}
          aria-label="Play"
          onClick={togglePlay}
        >
          {isPlaying ? <IconPause /> : <IconPlay />}
        </ControlButton>
        <ControlButton type="button" onClick={() => forward()}>
          <IconForward />
        </ControlButton>
        <span>
          {formattedCurrentTime} <span>/ {formattedDuration}</span>
        </span>
      </ControlBar>
      <audio
        ref={audioRef}
        title={title}
        src={src}
        // controls
        onPlay={() => {
          setIsPlaying(true)
        }}
        onPaste={() => {
          setIsPlaying(false)
        }}
        onEnded={() => {
          setIsPlaying(false)
        }}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
      />
    </>
  )
}
