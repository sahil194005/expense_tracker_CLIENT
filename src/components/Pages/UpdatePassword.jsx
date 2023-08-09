import React, { useRef, useState } from 'react'
import { Alert } from '@mui/material';
import axios from 'axios';
const UpdatePassword = () => {
    const newPassRef = useRef(null);
    const confirmPassRef = useRef(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState(false);
    const [AlertMsg, setAlertMsg] = useState('');
    const emailRef = useRef(null);
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (newPassRef.current.value !== confirmPassRef.current.value) {
                setSeverity('warning');
                setAlertMsg('Password dont Match');
                setOpenAlert(true);
                setTimeout(() => {
                    setOpenAlert(false);
                }, 5000);
            }
            else {
                let obj = {
                    email: emailRef.current.value,
                    password: newPassRef.current.value
                }
                let response = await axios.post('http://localhost:3006/users/updatePassword', obj);
                setSeverity('success');
                setAlertMsg(response.data.msg);
                setOpenAlert(true);
                setTimeout(() => {
                    setOpenAlert(false);
                }, 5000);
                window.location.href = '/';

            }

            newPassRef.current.value = confirmPassRef.current.value = emailRef.current.value = "";

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>

            <section className="bg-gray-50 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">

                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 border border-black">
                        {openAlert && <Alert severity={severity}>{AlertMsg}</Alert>}
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form onSubmit={formSubmitHandler} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input ref={newPassRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input ref={confirmPassRef} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-400 active:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
                        </form>
                    </div>
                </div>
            </section>



        </div>
    )
}

export default UpdatePassword