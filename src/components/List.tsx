import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Alert } from './Alerts';
const List = () => {
    const [alert, setAlert] = useState('')
    const [edit, setEdit]: [[boolean, number], any] = useState([false, 0])
    const [items, setItems]: [string[], any] = useState([]);
    function addItem(value: string) {
        if (!value) return
        setItems(items.concat([value]));
        setAlert('add');
    }
    function editItem(value: string, i: number): void {
        if (!value) return setEdit([false, 0])
        const tempArr = items.slice();
        tempArr[i] = value;
        setItems(tempArr);
        setEdit([false, 0]);
        setAlert('edit');
    }
    useEffect(() => {
        const timer = setTimeout(() => setAlert(''), 1000);
        return () => clearTimeout(timer)
    }, [alert])

    function deleteItem(i: number) {
        const tempArr = items.slice().filter((val, ind) => i !== ind);
        setItems(tempArr)
        setAlert('remove');
    }
    return (
        <div className='mx-auto flex flex-col my-2 gap-3 p-2 rounded-lg shadow-lg w-[90%] max-w-xl'>
            {alert == 'add' ? <Alert text='Item added to the list!' type='add' /> : ''}
            {alert == 'remove' ? <Alert text='Deleted item!' type='remove' /> : ''}
            {alert == 'clear' ? <Alert text='Emptied List' type='remove' /> : ''}
            {alert == 'edit' ? <Alert text='Value changed!' type='edit' /> : ''}
            <Form addItem={addItem} editItem={editItem} edit={edit} />
            <div className="flex flex-col gap-6 w-full">
                {items.map((item, i) => {
                    return (
                        <div key={v4()} className="hover:bg-slate-100 py-1 indent-2
                        text-lg rounded-md w-full flex justify-between items-center text-cyan-900">
                            {item}
                            <div className="flex w-fit gap-2 pr-2">
                                <FaEdit onClick={() => setEdit([true, i])} className='cursor-pointer fill-green-600' />
                                <FaTrash onClick={() => deleteItem(i)} className='cursor-pointer fill-red-600' />
                            </div>
                        </div>
                    )
                })}
                {items.length === 0 ? '' : (
                    <button className="text-lg self-center px-2 py-2 text-red-900 w-fit rounded-lg duration-200 ease-out
                hover:text-white hover:bg-red-900"
                        onClick={() => {
                            setItems([]);
                            setAlert('clear')
                        }}>Clear List</button>)}
            </div>
        </div>
    )
};

function Form({ addItem, edit, editItem }:
    {
        addItem: (value: string) => void, edit: [boolean, number],
        editItem: (value: string, i: number) => void
    }) {
    const [value, setValue] = useState('')
    return (
        <>
            <form action="#">
                <div className="flex gap-0">
                    <input onChange={(e) => setValue(e.target.value)} value={value} placeholder='E.g. Eggs' type="text"
                        className="focus:outline-none placeholder:text-lg text-lg placeholder:text-cyan-900 bg-slate-100 rounded-l-md p-2 w-full" />
                    <button onClick={e => {
                        e.preventDefault();
                        if (edit[0]) {
                            editItem(value, edit[1]);
                            setValue('');
                            return
                        }
                        addItem(value);
                        setValue('');
                    }} className="text-xl text-white bg-cyan-500 p-2 rounded-r-lg
                     hover:bg-cyan-700 duration-200 ease-in-out">{edit[0] ? 'Edit' : 'Submit'}</button>
                </div>
            </form>
        </>
    )
}

export { List } 
