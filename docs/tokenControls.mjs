import {
    div,
    img,
    flexCenteredCol,
    input,
    flexCenteredRow
} from 'https://cdn.jsdelivr.net/npm/@srfnstack/fntags@0.1.4/src/fnelements.mjs'
export default ( imageToken ) => {

    const control = ( prop, name, max = 50 ) => div(
        {
            style: {
                background: '#dedede'
            }
        },
        name,
        input(
            {
                type: 'number',
                min: 0,
                max,
                step: 1,
                value: imageToken.animationState.bindAttr( () => imageToken.animationState.getPath( prop ) ),
                onchange: e => imageToken.animationState.setPath( prop, e.target.value )
            }
        )
    )

    return flexCenteredCol(
        {style: {
            width: '100%',
                height: '100%'
            }},
        imageToken,
        flexCenteredRow(
            control( 'xFlipSpeed', 'X Flip Speed' ),
            control( 'yFlipSpeed', 'Y Flip Speed' ),
            control( 'tokenSpinSpeed', 'Token Spin Speed' ),
            control( 'rotateSpeed', 'Rotation Speed', 10 ),
            control( 'bounceDistance', 'Bounce Distance', 10 ),
            control( 'bounceSpeed', 'Bounce Speed', 10 )
        )
    )

}