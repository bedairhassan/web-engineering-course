import React, { useEffect, useState } from 'react';
import { read_cookie } from 'sfcookies';

// firebase
import readArray from './firebase/readArray'
import readScope from './firebase/readScope'


import filterOut from '../../components/FriendList/JS/FilterOut'

import firebasePush from '../../firebase/firebase-tools/firebasePush'

const Messaging = () => {

    const talkingto = read_cookie('messaging')
    const [data, dataSet] = useState()
    const [scope, scopeSet] = useState()

    const [displayChat,setdisplayChat]=useState(false)

    useEffect(() => readArray(talkingto).then(chat => {

        dataSet(chat)
        setdisplayChat(true)
    }), [])

    useEffect(() => readScope(talkingto).then(scope => scopeSet(scope)), [])


    // const [scopeDisplay,scopeDisplayset]=useState()
    // useEffect(()=>{scopeDisplayset(filterOut(scope,read_cookie('currentUser')))},[scope])

    return (
        <div class="main">

        {/* You are speaking to              {scope!==undefined && scopeDisplay} */}

        {/* <SendMessage child={scope}/> */}

            {(displayChat && data.length > 0) && data.map(item => <Each item={item} />)}
        </div>
    );
};

const SendMessage = ({child})=>{

    const [message,messageSet]=useState()


    function send(){

        let ref = 'message'
        let push = message

        firebasePush({ref,child,push})
    }

    return (
        <tr>
            <td><input onChange={e=>messageSet(e.target.value)}/></td>
            <td><button onClick={()=>send()}>Send Message</button></td>
        </tr>
    )
}

const Each = ({ item }) => {

    let { context, date, whoSend } = item

    let isThisMe = whoSend === read_cookie('currentUser')

    return (
        <div class="main" align={isThisMe ? `right` : `left`}>
            <h1>{context}</h1>
            <h2>{date}</h2>
        </div>
    )
}

export default Messaging;