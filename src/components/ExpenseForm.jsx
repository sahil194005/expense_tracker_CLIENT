import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Alert } from '@mui/material';

const ExpenseForm = () => {
    const amountRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryRef = useRef(null);

    const [severity, setSeverity] = useState('');
    const [resMsg, setResMsg] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let obj = {
                amount: amountRef.current.value,
                description: descriptionRef.current.value,
                category: categoryRef.current.value,
            }
            amountRef.current.value = descriptionRef.current.value = categoryRef.current.value = "";
            const token = JSON.parse(localStorage.getItem('token'));
            const response = await axios.post('http://localhost:3006/expenses/addExpense', obj, { headers: { "Authorization": token } });
            setSeverity('success');
            setResMsg(response.data.msg);
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 5000)

        } catch (error) {
            console.log(error);
            setSeverity('warning');
            setResMsg(error.response.data.msg);
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 5000)
        }
    }
    return (
        <div className="  w-full  flex items-center justify-center">
            <div className="max-w-md border border-black  w-full min-h-[700px]  p-6 bg-white rounded-lg shadow-lg">
                {openAlert && <Alert severity={severity}>{resMsg}</Alert>}

                <h1 className="text-5xl font-semibold text-center text-gray-800 mt-8 mb-6">Expense Form</h1>
                <form onSubmit={formSubmitHandler} className=' min-h-[500px] flex flex-col justify-evenly'>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-700">Money Spent</label>
                        <input ref={amountRef} type="number" className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-700">Description</label>
                        <input type="text" ref={descriptionRef} className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-700">Category</label>
                        <input type="text" ref={categoryRef} className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <button type="submit" className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-800 text-white py-2 rounded-lg mx-auto block focus:outline-none active:ring-2 active:ring-offset-2 active:ring-cyan-500 mb-2">Add Expense</button>
                </form>
            </div>
        </div>

    )
}

export default ExpenseForm