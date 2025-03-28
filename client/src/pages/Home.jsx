import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/css/Style.css';

function Home () {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {email, pass});

            if (response.data.message === "admin") {
                localStorage.setItem('userName', response.data.userName);
                localStorage.setItem('userType', response.data.userType);

                navigate('/Admin');
            } else if (response.data.message === "user") {
                localStorage.setItem('userName', response.data.userName);
                localStorage.setItem('userType', response.data.userType);

                navigate('/User');
            } else if (response.data.message === "invalid password") {
                Swal.fire({
                    title:'Invalid Password',
                    text:'Your password is invalid please try again',
                    icon:'error'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setEmail("");
                        setPass("");
                        window.location.reload();
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title:'Email Not Registered',
                text:'Your email is not registered please try again',
                icon:'error'
            }).then((result) => {
                if (result.isConfirmed) {
                    setEmail("");
                    setPass("");
                    window.location.reload();
                }
            });
        }
    }

    const signup = async () => {
        navigate('/Signup');
    }

    return(
        <>
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <h1 style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Login</h1>
                <br />

                <form onSubmit={submit}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input type="email" placeholder='Enter a email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control'/>
                        </div>
                    </div>
                    <br />

                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className='form-control'/>
                        </div>
                    </div>
                    <br />

                    <button className='btn btn-primary w-100'>Login</button>
                </form>
                <hr />

                <button className='btn btn-light w-100' onClick={() => signup()}>Sign Up</button>
            </div>
        </div>
        </>
    )
}

export default Home;