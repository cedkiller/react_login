import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function Home () {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const login = async (e) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:5000/login_record`, {email, pass});

        if (response.data.message === "admin")
        {
            navigate('/Admin');
        }

        else if (response.data.message === "user")
        {
            navigate('/User');
        }

        else if (response.data.message === "Invalid")
        {
            Swal.fire({
                title:'Invalid Email or Password',
                text:'The email or password is incorrect',
                icon:'error'
            })
        }

        else {
            Swal.fire({
                title:'Account Not Registered',
                text:'The account has not been registered',
                icon:'error'
            })
        }
    }

    const signup = async () => {
        navigate('/Signup');
    }
    return (
        <>
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <h1 style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Login</h1>
                <br />
                <form onSubmit={login}>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input type="email" placeholder='Enter your email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <br />
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                        <input type="password" className='form-control' value={pass} onChange={(e) => setPass(e.target.value)}/>
                        </div>
                    </div>
                    <br />
                    <button className='btn btn-primary w-100'>Login</button>
                </form>
                <br />
                <button className='btn btn-light w-100' onClick={signup}>Sign Up</button>
            </div>
        </div>
        </>
    );
}

export default Home;