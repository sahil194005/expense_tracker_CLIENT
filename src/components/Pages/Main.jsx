
import React from 'react'
import Header from '../Header'
import ExpenseForm from '../ExpenseForm'

const Main = () => {


  return (
    <div >
      <Header />
      <div className='flex mt-9 '>
        <div className='flex-1'>
          <ExpenseForm />
        </div>
        <div className='flex-1'>

        </div>
      </div>
    </div>
  )
}

export default Main