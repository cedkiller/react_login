import React from 'react';

function Admin () {
    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('user_name');
    const user_type = localStorage.getItem('user_type');

    return (
        <>
        <p>{user_id}</p>
        <p>{user_name}</p>
        <p>{user_type}</p>
        </>
    );
}

export default Admin;