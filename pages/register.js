import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

import { Context } from '../context';

const Register = () => {

    const [name, setName] = useState("Surendra")
    const [email, setEmail] = useState("suren.me456@gmail.com")
    const [password, setPassword] = useState("123456")
    const [loading, setLoading] = useState(false)

    const { state } = useContext(Context)
    const { user } = state
    
    const router = useRouter()

    useEffect(() => {
        if (user !== null) router.push("/")
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log({name, email, password})
        try {
            setLoading(true)
            const { data } = 
                await axios.post(`/api/register`,
                {
                    name,
                    email,
                    password
                });
            //console.log("REGISTER RESPONSE", data)
            toast.success('Registration Successful.Please login to continue')
            setName("")
            setEmail("")
            setPassword("")
            setLoading(false)
        } catch (err) {
            toast.error(err.response.data)
            setLoading(false)
        }

    }


    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Register</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                        required
                    />

                    <input
                        type="email"
                        className="form-control mb-4 p-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Please Enter Valid Email"
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-4 p-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />

                    

                    <button
                        type="submit"
                        className="btn btn-block btn-primary"
                        disabled={!name || !email || !password || loading}
                    >
                        {loading ? <SyncOutlined spin /> : "Submit"}
                    </button>
                </form>

                <p className="text-center p-3">
                    Already registered?{" "}
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Register
