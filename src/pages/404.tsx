import { NextPage } from 'next'
import Error from '@/components/Error'
import React, { Fragment } from 'react'

const Custom404: NextPage = () => {
    return (
        <Fragment>
            <Error />
        </Fragment>
    )
}

export default Custom404