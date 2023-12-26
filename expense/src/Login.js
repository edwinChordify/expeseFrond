import React from 'react'
import { useState } from 'react'
import instance from './baseURL'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [data, setdata] = useState("")


    const navigate = useNavigate()

    const loginThis = async (e) => {
        e.preventDefault()
        const info = { email: email, password: password }
        setdata(info)
        try {
            const registerresponse = await instance.post('/login', info)
            alert("logging in")
            console.log(registerresponse.data);

            const userId = registerresponse.data.id;
            localStorage.setItem("userId", userId);


            navigate('/dashboard')



        } catch (error) {
            alert("entered username or password is incorrect")
            console.log(error);

        }

    }



    return (
        <div><br />

            <div style={{
                width: "600px", marginLeft: "600px", backgroundColor: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            }}>
                <h1 style={{ color: 'blue' }}>EDD-Track</h1>

                <form action='' onSubmit={loginThis}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" name='email' id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" name='password' id="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>
                  
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>


        </div>
    )
}


export default Login