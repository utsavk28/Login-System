import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"

const LoginPage = () => {
    const history = useHistory()
    const [emailCheck, setEmail] = useState(false)
    const [passwordCheck, setPassword] = useState(false)
    const [account, setAccount] = useState(false)

    const myStorage = window.localStorage;
    useEffect(() => {
        if (myStorage.getItem('token') !== 'null') {
            history.push('/')
        }
    })

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    function updateUserData(newValue) {
        setUserData({
            ...userData,
            [newValue.target.id]: newValue.target.value
        })
    }



    async function submitForm(e) {
        e.preventDefault()
        if (!userData.email.includes('.')) setEmail(true)
        else setEmail(false)


        if (!(userData.password.length > 5)) setPassword(true)
        else setPassword(false)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(userData)
        try {
            const res = await axios.post('/api/login', body, config)
            setAccount(false)
            localStorage.setItem('token', res.data.token);
            history.push('/')
        } catch (error) {
            console.error(error);
            setAccount(true)
        }
    }

    return (<div className="homepage-container">
        <div className="homepage-container d-flex h-100 text-center text-white bg-dark">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto">
                    <div>
                        <h3 class="float-md-start mb-0">Login System</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                            <a className="nav-link" href="/register">Register</a>
                            <a className="nav-link active" href="/login">Login</a>
                        </nav>
                    </div>
                </header>

                <main className="px-3">
                    <div className="bd-example">
                        {emailCheck && <p>Check Email Again</p>}
                        {passwordCheck && <p>Password Should Contain more than 5 characters</p>}
                        {(!(emailCheck || passwordCheck) && account) && <p >Account already exists</p>}
                        <form onSubmit={submitForm}>
                            <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
                            <div className="mb-3">
                                <label htmlFor="email" className="visually-hidden">Email address</label>
                                <input type="email" id="email" className="form-control" placeholder="Email address" required onChange={updateUserData} value={userData.email} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="visually-hidden">Password</label>
                                <input type="password" id="password" className="form-control" placeholder="Password" required onChange={updateUserData} value={userData.password} />
                            </div>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
                    </div>
                </main>



                <footer className="mt-auto text-white-50">
                    <p>Code on <a href="https://getbootstrap.com/" className="text-white">Github</a>, by <a href="https://github.com/utsavk28" className="text-white">@utsav</a>.</p>
                </footer>
            </div>
        </div>
    </div>)
}

export default LoginPage

