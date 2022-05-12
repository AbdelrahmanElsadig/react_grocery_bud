import React from 'react'

const Alert = ({ type, text }: { type: 'add' | 'remove' | 'edit', text: string }) => {
    const style = type != 'remove' ? 'text-center self-center w-fit font-bold bg-green-200 text-green-900 rounded-md p-1' :
        'text-center self-center w-fit font-bold bg-red-200 text-red-900 rounded-md p-1';
    return (
        <div className={style}>
            {text}
        </div>
    )
}

export { Alert }
