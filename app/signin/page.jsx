"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useUser } from "../hooks/useUser";
import GoogleAuth from "../components/GoogleAuth";
import googleAuthMiddleware from "../middlewares/googleAuth";

export default function Login() {

  const [email, setEmail] = useState("")
  const [alertEmail, setAlertEmail] = useState({ prompt: "", color: "" })

  const [password, setPassword] = useState("")
  const [alertPassword, setAlertPassword] = useState({ prompt: "", color: "" })

  const [alert, setAlert] = useState({ prompt: "", type: "" })

  const [auth, setAuth] = useState({ email: "", sub: "" })

  const { token, setToken } = useUser()

  const router = useRouter()
  
  useEffect(() => {
      if(token) router.push("/")|| ""
  }, [])

  const signin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertEmail({ prompt: "All fields are required", color: "red" });
      setAlertPassword({ prompt: "All fields are required", color: "red" })
      return
    }
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, { email, password })
      const tokenState = {
        token: `Bearer ${data.token}`,
        name: data.name,
        _id: data._id
    }

      setToken(`Bearer ${data.token}`)
      localStorage.setItem("user", JSON.stringify(tokenState))

      router.push("/")
    } catch (error) {
      // return setAlert({ prompt: error.response.data.msg, type: "error" })
      console.log(error)
    }
  }

  useEffect(() => {
    googleAuthMiddleware({ auth, setAlert, router, type: "signin", setToken })
  }, [auth])

  return (
    <div className='left-right full-height'>
      <img src={"https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="cover" className="cover" id="left-login" />

      <div className="sign">
        <h2>Sign In</h2>
        <p>Enter your email and password</p>
        <form>
          <input type="text" placeholder="email" autoComplete="current-password" onChange={e => {
            setEmail(e.target.value);
            setAlertEmail({ prompt: "", color: "#e9e9e9" });
          }} style={{ borderColor: `${alertEmail.color}` }} />
          {alertEmail.prompt !== "" && (<p className="errorP">{alertEmail.prompt}</p>)}

          <input type="text" placeholder="password" onChange={e => {
            setPassword(e.target.value);
            setAlertPassword({ prompt: "", color: "#e9e9e9" });
          }} style={{ borderColor: `${alertPassword.color}` }} />
          {alertPassword.prompt !== "" && (<p className="errorP">{alertPassword.prompt}</p>)}

          <input type="submit" value="sign in" onClick={signin} />
        </form>
        <p>or sign up with</p>
        <div className="auth-methods">
          <GoogleAuth setAuth={setAuth} />
        </div>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  )
}
