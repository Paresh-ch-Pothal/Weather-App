import React from 'react'
import loading from './loading.gif'

export default function Loading() {
    return (
        <>
            <div>
                <img className='my-3' src={loading} alt="" />
            </div>
        </>
    )
}
