import {
  flexCenteredCol,
  input,
  img,
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

const rocketPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAFZUExURUdwTLGxsaioqBh7tGaKoA56tcU7N6eioKqqqmx2ew96tA96tMaLRePFCtq5Daenpw96tT6DssWjVcRGQ8Q7N7y8vKWlpU1dZX+Jjqeoqg96tK6wtK6urllpbVBlbw96tQ57tuKYCuJ+GcQ7N8Q7N9rHDePQCra2tqurq6WlpcTExN2ADFBlcN+0C8PDw296gMPDw8Q7N8Q7N8Q7N9qmDdrIDefUCdnIDdm7Db6+vuU5NcjIyAKI0EVaZM7OzsPDw8vLy9PT01RtedjY2Lq7u/Dw8OPf30VYYd3c3LKys7e3t+zr65Sdp62traSlpgiBwwx+vHiAhebm5tg6Nt5lJvGTHYuRlVNncQ57tt85NfzhBV5nb+N+fWaTwtZPJs1APfKyEeehoc8/J8laNeV2JvKoHeVsa3KQrtm3tpNwXrSUULREQzKLzSyKzn6Zuc1ravTPDeqCJvXQBEVOuqQAAABSdFJOUwCIWa0UIPIH/v/NeyztENJlSCFIpb/D/2L6lEHlyl/e8uHxcK+k1Lam8dTB8M1jrNuS0cqRlPZeYf////////////////////////////////1J48j5AAAB5ElEQVQ4y32TaXOiQBCGvUGNMZpstirZJJvKsfd9TgYnICMCAoKIZ0zcHHvf///DNiNaAeP2F2vqeebtpsFYbFEt7b3Yf5lZW0BX1zJnrtvvH2VuxE+f/3KPJnWTsPlQUj4EvP9qDnNxrDQaylSYm4G7RVqNWq0WRLh7c1xUmNA4YcLZakS4h9VAUD6yGbkwjyNZVmQj25FbLRUy3P0wT+hEklWnUqkMVUWVP59EOpR5TCQJ10GoU1WWJfHO9Q4prkixSKYCcELjM5jP9XqfTHTsG36LrCRJBM8C8nebgvDdoogZouF0sESIqCUmOJ2zBaifGkK+gUWRABUxvR/cz/VsCPhhUYqMYVYHhRUtziZMl6DHyERIg/kcdMxKL6auP2F6x9AnQhax0tZT4R2VLIQocuq3LfhB1Fznoh8YP7kIOYhSPh59y6lnPNykvkOR9iAR5duPqxajgHXeKM19JVvVasdkBuBRcyXCy0++dsGwTNO0jJEgNPOR+Qrji2EVyklsJv2lRhKWC+PT828Q0d2GUxKWaqdDwpvf7fbp+cWX7hbbWE8QdsIBb68uwfAeTd+MYIc7vBt4fy7b3m45OCftZHjEg4HnXY13l6bnjY3Ikg8Hg7+F18sL/+SxwuHB+//g2D9g0HjU4ni67QAAAABJRU5ErkJggg=='

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
            cursor: 'pointer',
            marginTop: '10px'
          },
          onclick: e => showControls(!showControls())
        },
        img({src:`data:image/png;base64,${rocketPngBase64}`})
      )
    ),
    imageToken
  ]
}