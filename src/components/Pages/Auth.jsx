import React, { useRef, useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import { NavLink } from 'react-router-dom'



const Auth = () => {
    const [login, setLogin] = useState(false)
    const [sendingReq, setSendingReq] = useState(false);
    const [openalert, setOpenAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');
    const [alertMsg, setAlertMsg] = useState("");
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);


    const AuthHandler = async (obj) => {
        try {
            if (login) {
                console.log('login being called')
                setSendingReq(true);
                const response = await axios.post(`http://localhost:3006/users/login`, obj);
                setSendingReq(false);
                setAlertSeverity('success');
                console.log(response)
                setAlertMsg(response.data.msg);
                localStorage.setItem('token', JSON.stringify(response.data.token));
                window.location.href = '/main'

            }
            else {
                console.log('signup being called');
                setSendingReq(true);
                const response = await axios.post(`http://localhost:3006/users/signup`, obj);
                setAlertSeverity('success');
                setAlertMsg(response.data.msg);
                setSendingReq(false);
                setLogin(true);
            }
        } catch (error) {
            console.log(error);
            setAlertSeverity('error');
            setSendingReq(false);
            console.log(error)
            setAlertMsg(error.response.data.msg);
        }
        setOpenAlert(true);
        setTimeout(() => {
            setOpenAlert(false);
        }, 5000)
    }
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        let SignUpObj = {};
        let LoginObj = {};
        if (!login) SignUpObj = {

            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        if (login) LoginObj = {
            email: emailRef.current.value,
            password: passwordRef.current.value
           
        }
        passwordRef.current.value = emailRef.current.value = "";

        login ? AuthHandler(LoginObj) : AuthHandler(SignUpObj)
    }
    return (
        <div className="mt-[30px] flex flex-col items-center " >
            <p className=" text-6xl my-4 font-serif text-center">Welcome Back</p>
            <div className=" grid sm:grid-cols-2 sm:grid-rows-1 p-7 bg-gradient-to-r from-purple-400 to-purple-900 ... ">
                <div className=" bg-white p-5 flex flex-col justify-evenly">
                    {openalert && <Alert severity={alertSeverity}>{alertMsg}!</Alert>}
                    <form className="  min-h-[400px] flex flex-col justify-evenly md:min-h-[500px] md:min-w-[400px]" action="" onSubmit={formSubmitHandler}>
                        <p className="font-serif text-4xl  tracking-[4px]">{login ? 'Login' : 'SignUp'}</p>
                        <div className="flex flex-col py-3">
                            <label>Email :</label>
                            <input ref={emailRef} className="text-center border-b-4 p-2 border-gray-400" type="email"  ></input>
                        </div>
                        <div className="flex flex-col py-3">
                            <label >Password</label>
                            <input ref={passwordRef} className=" text-center border-b-4 p-2 border-gray-400" type="password"  ></input>
                        </div>
                        {!sendingReq && <button className="bg-purple-700 rounded-md focus:bg-purple-950 duration-700 text-white text-2xl p-2 text-center" >{login ? 'login' : 'signUp '}</button>}
                        {sendingReq && <button className="bg-purple-700 rounded-md hover:bg-purple-600 duration-700 text-white text-2xl p-2 text-center">sending Req</button>}
                    </form>
                    <div className="text-2xl p-2 text-center font-QuickSand " onClick={() => setLogin((state) => !state)}>
                        <button >{login ? 'New User??' : 'Already a member??'}
                            <p>Click Here</p></button>
                    </div>
                    <NavLink to="/forgotPassword" className="text-1xl p-2 text-center text-blue-600" >
                        Forgot Password ?
                        Click Here
                    </NavLink>
                </div>
                <div className=" hidden sm:block bg-white   ">
                    <img className=" max-h-[700px] w-full " src="https://plus.unsplash.com/premium_photo-1681589452811-513d1952077c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" alt="" />
                    {/* <img className="object-cover max-h-[650px] w-full " src="https://i.pinimg.com/564x/08/49/ec/0849ec3fae1337e159eefe1cb3232097.jpg" alt="" /> */}

                </div>
            </div>
        </div>


    );
}

export default Auth






