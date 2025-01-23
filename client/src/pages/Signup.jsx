import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [type, setType] = useState("");

    const signup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/signup_record`, { name, email, pass, type });

            if (response.data.message === "signup success") {
                Swal.fire({
                    title: 'Sign Up Success',
                    text: 'You have successfully signed up. Please login to continue.',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                })
            } else {
                Swal.fire({
                    title: 'Error in Sign Up',
                    text: 'The server encountered an error while signing up. Please try again later.',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Error during signup:', error);
            Swal.fire({
                title: 'Error in Sign Up',
                text: 'An error occurred during signup. Please try again later.',
                icon: 'error'
            });
        }
    };

    const back = async () => {
        navigate('/');
    }

    return (
        <>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='div'>
                    <h1 style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Sign Up</h1>
                    <br />
                    <form onSubmit={signup}>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" placeholder='Enter your name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" placeholder='Enter your email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className='form-control' value={pass} onChange={(e) => setPass(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">User Type</label>
                            <div className="col-sm-10">
                                <select onChange={(e) => setType(e.target.value)} className='form-control'>
                                    <option value=''>Select User Type</option>
                                    <option value='admin'>Admin</option>
                                    <option value='user'>User</option>
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