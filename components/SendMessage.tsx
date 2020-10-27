import React, {ChangeEvent, useState} from 'react';
import {useSendMessageMutation} from "../generated/apolloComponents";

export const SendMessage = ({refetch, to} : {refetch: any, to: number}) => {

    const [inputValues, setInputValues] = useState({
        msg: '',
    })

    const [sendMessage] = useSendMessageMutation()

    const handleSendMessage = async (event) => {
        event.preventDefault()
        const {data: {enviarMensaje: res}} = await sendMessage({
            variables: {
                msg: inputValues.msg,
                to
            }
        })
        if (!res.ok) {
            console.log('El mensaje no se ha podido enviar')
            console.log(res)
        } else {
            console.log(res.msg)
            await refetch()
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
            <form>
                <input type="text" name="msg" value={inputValues.msg} onChange={handleInputChange}/>
                <button onClick={handleSendMessage}>
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default SendMessage;
