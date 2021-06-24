import {
    div,
    img,
    flexCenteredCol
} from 'https://cdn.jsdelivr.net/npm/@srfnstack/fntags@0.1.4/src/fnelements.mjs'
import { fnstate } from 'https://cdn.jsdelivr.net/npm/@srfnstack/fntags@0.1.4/src/fntags.mjs'

export default ( {
                     imgUrl,
                     imgFront,
                     imgBack,
                     rgb,
                     diameter,
                     containerSize,
                     thickness,
                     edgeFaceCount,
    initialAnimationState
                 } ) => {
    diameter = diameter || 300
    containerSize = containerSize || 750
    thickness = thickness || 20
    const [red, green, blue] = rgb || [175, 175, 175];
    edgeFaceCount = edgeFaceCount || 80
    const edgeFaceLength = 3.14 * diameter / edgeFaceCount
    if( imgUrl ) {
        imgFront = imgUrl
        imgBack = imgUrl
    }
    const animationState = fnstate( initialAnimationState|| {
        xFlipSpeed: 1,
        yFlipSpeed: 1,
        tokenSpinSpeed: 1,
        rotateSpeed: 1,
        bounceDistance: 5,
        bounceSpeed: 5,
    } )

    const face = ( imgUrl, name, transform ) => img( {
        width: diameter, height: diameter,
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
                transition: 'all .3s',
            }
        },
        face( imgFront, 'front', `translateZ(${thickness / 2}px)` ),
        new Array( edgeFaceCount ).fill( 0 ).map( ( _, i ) => {
                const darkenPercent = 1 - Math.pow( i - edgeFaceCount / 2, 2 ) / ( Math.pow( edgeFaceCount, 2 ) / 4 )
                return div( {
                    style: {
                        position: 'absolute',
                        height: edgeFaceLength + 1 + 'px',
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
    const container = div( token )
    let rotateX, rotateY, spinToken, spinContainer, bounce

    const runAnimate = () => {

        if( rotateX ) rotateX.cancel()
        if( rotateY ) rotateX.cancel()
        if( spinToken ) rotateX.cancel()
        if( bounce ) bounce.cancel()
        if( spinContainer ) spinContainer.cancel()
        rotateX = token.animate(
            [{ transform: 'rotateX(0)' },
                {
                    transform:
                        `rotateX(360deg)`
                }
            ],
            {
                duration: 10000 / animationState().xFlipSpeed,
                iterations: Infinity,
                easing: 'linear'
            }
        )
        rotateY = token.animate(
            [{ transform: 'rotateY(0)' },
                {
                    transform:
                        `rotateY(360deg)`
                }
            ],
            {
                duration: 10000 / animationState().yFlipSpeed,
                iterations: Infinity,
                easing: 'linear',
                composite: 'add'
            }
        )
        spinToken = token.animate(
            [{ transform: 'rotate(0)' },
                {
                    transform:
                        `rotate(360deg)`
                }
            ],
            {
                duration: 10000 / animationState().tokenSpinSpeed,
                iterations: Infinity,
                easing: 'linear',
                composite: 'add'
            }
        )
        spinContainer = container.animate(
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
        let maxDistance = ( containerSize - diameter / 2 ) / 2 * ( animationState().bounceDistance / 10 );
        bounce = container.animate(
            [{ transform: 'rotateX(0) rotateY(0) rotate(0) translateX(0)', offset: 0, easing: 'ease-out' },
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
                iterations: Infinity,
                composite: 'add'
            }
        )
    }
    animationState.subscribe( runAnimate )
    runAnimate()
    let imageToken = flexCenteredCol(
        {
            style: {
                width: '100%',
                'max-height': `${containerSize}px`,
                height: '100%',
                'justify-content': 'center',
                'max-width': `${containerSize}px`,
            }
        },
        container
    );
    imageToken.animationState = animationState
    return imageToken

}