"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from 'next/navigation'
import Alert from "../components/Alert";
import GoogleAuth from "../components/GoogleAuth";
import googleAuthMiddleware from "../middlewares/googleAuth"

export default function SignUp() {
  const [name, setName] = useState("")
  const [alertName, setAlertName] = useState({ prompt: "", color: "" })

  const [email, setEmail] = useState("")
  const [alertEmail, setAlertEmail] = useState({ prompt: "", color: "" })

  const [password, setPassword] = useState("")
  const [alertPassword, setAlertPassword] = useState({ prompt: "", color: "" })

  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [alertPasswordConfirm, setAlertPasswordConfirm] = useState({ prompt: "", color: "" })

  const [alert, setAlert] = useState({ prompt: "", type: "" })

  const [auth, setAuth] = useState({ name: "", email: "", sub: "" })

  const { token } = useUser()
  const router = useRouter()

  useEffect(() => {
      if(token) router.push(process.env.NEXT_PUBLIC_CLIENT_URL)|| ""
  }, [])

  const signUp = async (e) => {
    e.preventDefault();

    if (!email || !name || !password) {
      setAlertName({ prompt: "All fields are required", color: "red" });
      setAlertEmail({ prompt: "All fields are required", color: "red" });
      setAlertPassword({ prompt: "All fields are required", color: "red" })
      setAlertPasswordConfirm({ prompt: "All fields are required", color: "red" })
      return
    }

    if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) setAlertEmail({ prompt: "Invalid email", color: "red" })
    if (password.length < 8) return setAlertPassword({ prompt: "Password must be at least 8 characters", color: "red" })
    if (!password.split("").some(char => char.match(/[A-Z]/))
      || !password.split("").some(char => char.match(/[a-z]/))
      || !password.split("").some(char => char.match(/[0-9]/))
    ) return setAlertPassword({ prompt: "the password must contain at least one uppercase letter, one lowercase letter and one number", color: "red" })

    if (password !== passwordConfirm) return setAlertPasswordConfirm({ prompt: "Passwords do not match", color: "red" })

    try {
      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/users/newUser`, { name, email, password })
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/newUser`, { name, email, password })
      localStorage.setItem("user", `Bearer ${data.token}`)
      router.push(process.env.NEXT_PUBLIC_CLIENT_URL)
    } catch (error) {
      // return setAlert({ prompt: error?.response?.data?.msg, type: "error" })
      console.log(error)
    }
  }

  useEffect(() => {
    googleAuthMiddleware({ auth, setAlert, router, type: "signup" })
  }, [auth])

  return (
    <div className='left-right full-height'>
      <img src={"https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="cover" className="cover" id="left-login" />

      <div className="sign">
        <h2>Sign up</h2>
        {alert.prompt !== "" && <Alert alert={alert} />}
        <p>Enter your name, email and password</p>
        <form>
          <input type="text" placeholder="name" onChange={e => {
            setName(e.target.value);
            setAlertName({ prompt: "", color: "#e9e9e9" });
          }} style={{ borderColor: `${alertName.color}` }} />
          {alertName.prompt !== "" && (<p className="errorP">{alertName.prompt}</p>)}

          <input type="text" placeholder="email" onChange={e => {
            setEmail(e.target.value);
            setAlertEmail({ prompt: "", color: "#e9e9e9" });
          }} style={{ borderColor: `${alertEmail.color}` }} />
          {alertEmail.prompt !== "" && (<p className="errorP">{alertEmail.prompt}</p>)}

          <input type="text" placeholder="password" onChange={e => {
            setPassword(e.target.value);
            setAlertPassword({ prompt: "", color: "#e9e9e9" });
          }} style={{ borderColor: `${alertPassword.color}` }} />
          {alertPassword.prompt !== "" && (<p className="errorP">{alertPassword.prompt}</p>)}

          <input type="text" placeholder="confirm password" onChange={e => {
            setPasswordConfirm(e.target.value);
            setAlertPasswordConfirm({ prompt: "", color: "#e9e9e9" });
          }} style={{ borderColor: `${alertPasswordConfirm.color}` }} />
          {alertPasswordConfirm.prompt !== "" && (<p className="errorP">{alertPasswordConfirm.prompt}</p>)}

          <input type="submit" value="sign up" onClick={signUp} />
        </form>
        <p>or sign up with</p>
        <div className="auth-methods">
          {/* <button><img src="https://i.imgur.com/G2Jsclz.png" alt="google logo" />Google</button>  */}
          {/* <button><img src="https://i.imgur.com/2kftr0o.png" alt="apple logo" />Apple</button> */}
          <GoogleAuth setAuth={setAuth} />
        </div>
        <p>Already have an account? <a href="/signin">Sign in</a></p>
      </div>
    </div>
  )
}