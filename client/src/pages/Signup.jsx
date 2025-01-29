import React, {useState, useEffect} from 'react';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Style.css';

function Signup () {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [type, setType] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup_rec',{name, email, pass, type});

            if (response.data.message === "success")
            {
                Swal.fire({
                    title:'Account Registered',
                    text:'Your account has been registered please login',
                    icon:'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                })
            }
        } catch (error) {
            
        }
    }

    const back = async () => {
        navigate('/');
    }
    return (
        <>
        <br />
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <h1 style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Sign Up</h1>
                <br />
                <form onSubmit={submit}>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text" placeholder='Enter your name' className='form-control' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <br />
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
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                        <select className='form-control' onChange={(e) => setType(e.target.value)}>
                            <option value="">Select User Type</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        </div>
                    </div>
                    <br />
                    <button className='btn btn-primary w-100'>Sign Up</button>
                </form>
                <br />
                <button className='btn btn-danger w-100' onClick={back}>Back</button>
            </div>
        </div>
        </>
    );
}

export default Signup;