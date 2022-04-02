import {
  flexCenteredCol,
  input,
  flexCenteredRow,
  div
} from 'https://cdn.jsdelivr.net/npm/@srfnstack/fntags@0.3.5/src/fnelements.mjs'

import {
  fnstate
} from 'https://cdn.jsdelivr.net/npm/@srfnstack/fntags@0.3.5/src/fntags.mjs'

export const showControls = fnstate(false)
const controlsWidth = 250
const calculatePosition = () => window.innerWidth > 750 ? window.innerWidth * 0.2 : ( window.innerWidth - controlsWidth ) / 2
const position = fnstate(calculatePosition())
window.addEventListener('resize', () => position(calculatePosition()))

export default (imageToken) => {
  const control = (prop, name, max = 50) =>
    flexCenteredRow(
      {
        style: {
          minWidth: '200px',
          minHeight: '35px',
          justifyContent: 'space-between'
        }
      },
      name,
      input(
        {
          type: 'number',
          min: 0,
          max,
          step: 1,
          value: imageToken.animationState.bindAttr(() => imageToken.animationState.getPath(prop)),
          onchange: e => imageToken.animationState.setPath(prop, e.target.value)
        }
      )
    )
  return [
    flexCenteredCol(
      {
        onclick: e => e.stopPropagation(),
        style: {
          width: `${controlsWidth}px`,
          zIndex: 1000,
          position: 'fixed',
          left: position.bindStyle(),
          top: showControls.bindStyle(() => showControls() ? 0 : -255),
          transition: 'top .5s ease-in-out',
        }
      },
      flexCenteredCol(
        {
          style: {
            width: '80%',
            maxWidth: '750px',
            overflow: 'hidden',
            height: '225px',
            justifyContent: 'space-evenly',
            background: 'linear-gradient(#dedede, #deebff)',
            padding: '15px',
            flexWrap: 'wrap'
          }
        },
        control('xFlipSpeed', 'X Flip Speed'),
        control('yFlipSpeed', 'Y Flip Speed'),
        control('tokenSpinSpeed', 'Token Spin Speed'),
        control('rotateSpeed', 'Rotation Speed', 10),
        control('bounceDistance', 'Bounce Distance', 10),
        control('bounceSpeed', 'Bounce Speed', 10)
      ),
      div(
        {
          style: {
            fontSize: '30px',
            animationName: 'wiggle',
            animationDuration: '4000ms',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            cursor: 'pointer'
          },
          onclick: e => showControls(!showControls())
        },
        '🚀'
      )
    ),
    imageToken
  ]
}