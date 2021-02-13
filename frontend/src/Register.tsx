import React from 'react'

const Register : React.FC<any> = () => {
    return (
        <div className="register-user">
            <h3>Register New User</h3>
            <div className="form-entry">
                <input type="text" id="username" placeholder="Enter a username"></input>
                <input type="password" id="password" placeholder="Enter a password"></input>
                <button className="register-btn" type="submit">Register</button>
            </div>
        </div>
    )
}

export default Register