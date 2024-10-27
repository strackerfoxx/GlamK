import axios from "axios";

export default function googleAuthMiddleware({ auth, setAlert, router, type, setToken }) {

    let value 
    value = localStorage || ""
    const authenticate = async () => {
        try {
            let response = {}
            if (type === "signup") {
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/newUser`,
                    { name: auth.name, email: auth.email, password: auth.sub, auth: true })

                response = data
            } else if (type === "signin") {
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`,
                    { email: auth.email, password: auth.sub })

                response = data
            }
            const tokenState = {
                token: `Bearer ${response.token}`,
                name: response.name,
                _id: response._id
            }

            setToken(`Bearer ${response.token}`)
            value.setItem("user", JSON.stringify(tokenState))

            router.push("/")
        } catch (error) {
            return setAlert({ prompt: error?.response?.data?.msg, type: "error" })
        }
    }

    if (auth.email !== "") {
        authenticate()
    }
}