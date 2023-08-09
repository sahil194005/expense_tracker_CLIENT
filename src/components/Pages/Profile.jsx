import React, { useRef,useEffect } from 'react'
import axios from 'axios';
import Header from '../Header';

const Profile = () => {
    const nameRef = useRef(null);
    const imageRef = useRef(null);
    useEffect(() => {
        const getPrevProfileDB = async () => {
            try {
               
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get('http://localhost:3006/users/profile/getProfile',{ headers: { "Authorization": token } });
              
                nameRef.current.value = response.data.data.name;


            } catch (error) {
                console.log(error);
            }
            
        }
        getPrevProfileDB();
        
    },[])


    
  
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let obj = {
                name: nameRef.current.value,
                image: imageRef.current.value
            }
            const token = JSON.parse(localStorage.getItem('token'));
            await axios.post('http://localhost:3006/users/profile/complete', obj, { headers: { "Authorization": token } });
           
          
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
          <Header/>
            <div className="flex items-center justify-center p-12 ">
                <div className="mx-auto w-full max-w-[550px] bg-white border border-black rounded-md">
                    <form className="py-6 px-9" onSubmit={formSubmitHandler} method="POST">
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-semibold text-[#07074D] ">
                                Enter Your Name:
                            </label>
                            <input type="text" placeholder="Sponge Bob" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" ref={nameRef} required />
                        </div>
                        <div className="mb-6 pt-4">
                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                Upload File
                            </label>
                            <div className="mb-8">
                                <input type="file" name="file" id="file" className="sr-only" ref={imageRef} required />
                                <label htmlFor="file" className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                                    <div>
                                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                            Drop files here
                                        </span>
                                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                            Or
                                        </span>
                                        <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                            Browse
                                        </span>
                                    </div>
                                </label>
                            </div>


                        </div>
                        <div>
                            <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none active:bg-blue-700">
                                Send File
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Profile