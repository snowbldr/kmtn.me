import {
    div,
    img,
    flexCenteredCol
} from 'https://cdn.jsdelivr.net/npm/@srfnstack/fntags@0.3.5/src/fnelements.mjs'
import { fnstate } from 'https://cdn.jsdelivr.net/npm/@srfnstack/fntags@0.3.5/src/fntags.mjs'

export default ( {
                     imgUrl,
                     imgFront,
                     imgBack,
                     rgb,
                     diameter,
                     thickness,
                     edgeFaceCount,
                     initialAnimationState
                 } ) => {
    diameter = diameter || 300
    thickness = thickness || 20
    const [red, green, blue] = rgb || [175, 175, 175];
    edgeFaceCount = edgeFaceCount || 90
    const edgeFaceLength = Math.PI * diameter / edgeFaceCount
    if( imgUrl ) {
        imgFront = imgUrl
        imgBack = imgUrl
    }
    const animationState = fnstate( initialAnimationState || {
        xFlipSpeed: 1,
        yFlipSpeed: 1,
        tokenSpinSpeed: 1,
        rotateSpeed: 1,
        bounceDistance: 5,
        bounceSpeed: 5,
    } )

    const face = ( imgUrl, name, transform ) => img( {
        width: diameter+0.6, height: diameter+0.6,
        src: imgUrl, style: {
            'border-radius': '50%',
            transform,
            position: 'absolute',
            overflow: 'hidden',
            background: `rgb( ${red},${green},${blue})`,
        }
    } )

    const token = div( {
            style: {
                width: diameter + 'px',
                height: diameter + 'px',
                position: 'relative',
                margin: '50px auto',
                'transform-style': 'preserve-3d',
                transition: 'all .3s'
            }
        },
        face( imgFront, 'front', `translateZ(${thickness / 2}px)` ),
        new Array( edgeFaceCount ).fill( 0 ).map( ( _, i ) => {
                const darkenPercent = 1 - Math.pow( i - edgeFaceCount / 2, 2 ) / ( Math.pow( edgeFaceCount, 2 ) / 4 )
                return div( {
                    style: {
                        position: 'absolute',
                        height: edgeFaceLength + 2 + 'px',
                        width: `${thickness}px`,
                        background: `rgb( ${red * darkenPercent},${green * darkenPercent},${blue * darkenPercent})`,
                        transform:
                            `translateY(${diameter / 2 - edgeFaceLength / 2}px)
                                translateX(${diameter / 2 - thickness / 2}px)
                                rotateZ(${360 / edgeFaceCount * i + 90}deg)
                                translateX(${diameter / 2}px)
                                rotateY(90deg)`
                    }
                }, )
            }
        ),
        face( imgBack, 'back', `translateZ(-${thickness / 2}px) rotateY(180deg)` ),
    )
    const bounceContainer = div( token )
    let imageToken = flexCenteredCol(
        {
            style: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                zIndex: 50,
            }
        },
        bounceContainer
    );
    let flip, spin, bounce

    const runAnimate = () => {

        if( flip ) flip.cancel()
        if( bounce ) bounce.cancel()
        if( spin ) spin.cancel()
        flip = token.animate(
            [
                { transform: `rotateX(${360 * animationState().xFlipSpeed}deg) rotateY(${360 * animationState().yFlipSpeed}deg) rotate(${360 * animationState().tokenSpinSpeed}deg)` }
            ],
            {
                duration: 10000,
                iterations: Infinity,
                easing: 'linear'
            }
        )
        spin = imageToken.animate(
            [{ transform: 'rotate(0)' },
                {
                    transform:
                        `rotate(360deg)`
                }
            ],
            {
                duration: 20000 / animationState().rotateSpeed,
                iterations: Infinity,
                easing: 'linear'
            }
        )

        let maxDimension = window.innerWidth
        if(window.innerHeight > window.innerWidth) {
            maxDimension = window.innerHeight
        }
        if(maxDimension > 1000) {
            maxDimension = 1000
        }

        let maxDistance = ( maxDimension  ) / 2 * ( animationState().bounceDistance / 10 );
        bounce = bounceContainer.animate(
            [{ transform: 'translateX(0)', offset: 0, easing: 'ease-out' },
                {
                    transform: `translateX(${maxDistance}px)`,
                    offset: 0.25,
                    easing: 'ease-in-out'
                },
                {
                    transform: `translateX(${-maxDistance}px)`,
                    offset: 0.75,
                    easing: 'ease-in'
                },
                {
                    transform: `translateX(0)`, offset: 1, easing: 'linear'
                },
            ],
            {
                duration: 10000 / animationState().bounceSpeed,
                iterations: Infinity
            }
        )
    }
    animationState.subscribe( runAnimate )
    runAnimate()

    imageToken.animationState = animationState
    return imageToken

}