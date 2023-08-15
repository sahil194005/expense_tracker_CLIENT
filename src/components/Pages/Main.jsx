
import React, { useState, useEffect, useContext } from 'react'
import Header from '../Header'
import ExpenseForm from '../ExpenseForm'
import SingleExpense from '../SingleExpense'
import { BsCalendar2Event } from 'react-icons/bs'
import axios from 'axios'
import { GlobalContext } from '../Context/gobalContext'
const Main = () => {
  const { setTotalExpense, totalExpense, isDark } = useContext(GlobalContext)
  const [Expenses, setExpenses] = useState([])
  useEffect(() => {
    const getFromDB = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.get('http://localhost:3006/expenses/getExpenses', { headers: { "Authorization": token } })
        setExpenses(response.data.data);
        let sum = 0;
        response.data.data.forEach((item) => sum = sum + item.amount);
        setTotalExpense(sum);
      } catch (error) {
        console.log(error);
      }
    }
    getFromDB()
  }, [Expenses]);

  const downloadCSV = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      let response = await axios.get('http://localhost:3006/expenses/downloadCSV', { headers: { "Authorization": token } });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'usersData.csv');
      document.body.appendChild(link);
      link.click()
     
    } catch (error) {
      console.log(error);
    }

  }
  
  const ExpensesArr = Expenses.map((expense) => {
    return <SingleExpense key={expense._id} amount={expense.amount} description={expense.description} userId={expense.userId} _id={expense._id} setExpenses={setExpenses} category={expense.category} />
  })
  return (
    <div className={isDark ? 'bg-gray-600 h-screen' : 'h-screen'}>
      <Header />
      <div className='flex mt-9 '>
        <div className='flex-1'>
          <ExpenseForm setExpenses={setExpenses} />
        </div>
        <div className='flex-1 '>
          <div className=' max-w-[700px] min-h-[700px] rounded-md border border-black mx-auto '>
            <div className='border-b   p-2 h-[80px] flex justify-center text-3xl items-center border-t border-gray-400  '>
              <span className='p-3'>{<BsCalendar2Event />}</span>
              <span className='p-3'>Your Expenses History</span>
            </div>
            {ExpensesArr}
            <div className='min-h-[87px] flex items-center justify-between border-b-2'>
              <span className='text-2xl font-bold text-gray-800 p-3'>Total</span>
              <div>
                {totalExpense >= 1000 && <span><button onClick={downloadCSV} className='text-2xl font-bold text-blue-700 p-3 border border-blue-500 active:bg-blue-300 rounded-lg'>Download</button></span>}
                <span className='text-2xl font-bold text-red-700 p-3'> Rs. {totalExpense}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Main