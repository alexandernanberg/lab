import styled, { css } from 'styled-components'

export const Hero = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  color: white;
  background: var(--dark);

  a {
    color: var(--yellow);
  }
`

export const ControlBar = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  background: var(--gray);

  > span {
    margin-left: 12px;
    color: white;
    font-variant-numeric: tabular-nums;

    span {
      opacity: 0.5;
    }
  }
`

export const ControlButton = styled.button`
  display: inline-flex;
  place-items: center;
  place-content: center;
  height: 36px;
  width: 36px;
  padding: 0;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  text-align: center;
  appearance: none;
  background: none;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.05);
  }
`

const timelineThumb = css`
  position: relative;
  border: 0;
  border-radius: 50%;
  height: var(--thumb-height);
  width: var(--thumb-height);
  background: white;
  box-shadow: var(--thumb-shadow);
  appearance: none;
`

const timelineThumbActive = css`
  box-shadow: var(--thumb-shadow), 0 0 0 4px rgba(255, 255, 255, 0.5);
`

const timelineTrack = css`
  border: 0;
  border-radius: calc(var(--track-height) / 2);
  height: var(--track-height);
  background: rgba(249, 193, 51, 0.5);
  user-select: none;
`

export const Timeline = styled.div`
  position: relative;
  z-index: 1;
  background: var(--gray);

  input[type='range'] {
    --track-height: 4px;
    --thumb-height: 16px;
    --thumb-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.25);
    display: block;
    border: 0;
    margin: 0;
    padding: 0;
    height: var(--track-height);
    width: 100%;
    outline: none;
    color: var(--yellow);
    background: transparent;
    appearance: none;

    &::-moz-focus-outer {
      border: 0;
    }

    &::-webkit-slider-runnable-track {
      ${timelineTrack}
      background-image: linear-gradient(
        to right,
        currentColor var(--progress, 0%),
        transparent var(--progress, 0%)
      );
    }

    &::-webkit-slider-thumb {
      ${timelineThumb}
      margin-top: calc((var(--thumb-height) - var(--track-height)) / -2);
    }

    &::-moz-range-track {
      ${timelineTrack}
    }

    &::-moz-range-thumb {
      ${timelineThumb}
    }

    &::-moz-range-progress {
      border-radius: calc(var(--track-height) / 2);
      height: var(--track-height);
      background: currentColor;
    }

    &:focus,
    &:active {
      &::-webkit-slider-thumb {
        ${timelineThumbActive}
      }

      &::-moz-range-thumb {
        ${timelineThumbActive}
      }
    }
  }
`
