import React, {ChangeEvent, useState} from "react";
import {useLoginMutation} from "../generated/apolloComponents";

const Auth = () => {
    const [login] = useLoginMutation()
    const [inputValues, setInputValues] = useState({
        email: 'lucas.vergara@usm.cl',
        pass: 'nokia303..',
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        const {data} = await login({
            variables: inputValues
        })
        if (!data.login.ok) {
            console.log(data.login.msg)
        } else {
            localStorage.setItem('token', data.login.token)
            console.log(data.login.msg)
        }
    }

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [evt.target.name]: evt.target.value
        })
    }

    return (
        <div>
            <h2> Auth page </h2>
            <form>
                <input name="email" onChange={handleInputChange} value={inputValues.email} type="text"/>
                <input name="pass" onChange={handleInputChange} value={inputValues.pass} type="password"/>
                <button onClick={handleLogin} type="submit">
                    Set JWT
                </button>
            </form>
        </div>
    );
};

export default Auth;
