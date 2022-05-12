import React from 'react'
import { List } from './List'

const Project = () => {
    return (
        <div className='container w-full mx-auto flex flex-col gap-4 mt-16 items-center'>
            <h1 className="text-4xl font-bold pb-3 relative after:absolute after:h-1
            after:w-1/2 after:bg-cyan-500 after:left-1/4 after:bottom-0">Grocery Bud</h1>
            <List />
        </div>
    )
}

export { Project }
