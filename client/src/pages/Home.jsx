import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Style.css';

function Home() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/login_rec',{email, pass});

            if (response.data.message === "admin")
            {
                localStorage.setItem('user_id',response.data.user_id);
                localStorage.setItem('user_name',response.data.user_name);
                localStorage.setItem('user_type',response.data.user_type);
                
                navigate('/Admin');
            } else if (response.data.message === "user") {
                localStorage.setItem('user_id',response.data.user_id);
                localStorage.setItem('user_name',response.data.user_name);
                localStorage.setItem('user_type',response.data.user_type);
                
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
                    }
                })
            }
        } catch (error) {
            if (error.response.data.message === "Error") {
                Swal.fire({
                    title:'Email Not Registered',
                    text:'Your email is not registered in the system please sign up',
                    icon:'error'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setEmail("");
                        setPass("");
                    }
                })
            }
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
                <form onSubmit={submit}>
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