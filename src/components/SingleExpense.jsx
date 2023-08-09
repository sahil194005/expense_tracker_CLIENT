import React from 'react'

const SingleExpense = (props) => {
    console.log(props)
    return (
        <div className='min-h-[70px] p-4 flex justify-between items-center text-2xl text-gray-800 border-b border-gray-400' >
            <span className='font-bold'>{props.description}</span>
            <div>
            <span className='text-red-800 font-bold p-4'> Rs. {props.amount}</span>
                <button className='border rounded-md p-1 pl-2 pr-2 text-lg bg-blue-800 text-white m-2'>Edit</button>
                <button className='border rounded-md p-1 pl-2 pr-2 text-lg bg-red-900 text-white'>Delete</button>
            </div>
        </div>
    )
}

export default SingleExpense
