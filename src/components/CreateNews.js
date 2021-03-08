import React, { useEffect, useState } from "react"

import Select from '../reusable-components/Select'
import RowCell from '../reusable-components/RowCell'
import Input from '../reusable-components/Input'
import { bake_cookie, read_cookie } from "sfcookies"

// import firebaseSet from '../../firebase/firebase-tools/firebaseSet'
import firebasePush from '../firebase/firebase-tools/firebasePush'


export default function CreatePost() { // type,text

  // type,text,date,user
  const [post, postset] = useState({})

  function setpost(key, value) { // can be reusable 
    const tmp = { ...post }
    tmp[key] = value
    postset(tmp)
  }

  function isEmpty(map) { // checks on empty array or empty object or empty string
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  
  function submit() {

    // extra attributes
    let date = new Date() + ``
    let user = read_cookie(`currentUser`)

    // reassign
    let topost={...post}
    topost['date']=date
    topost['user']=user

    if (isEmpty(user)) {
      alert(`user did not sign in yet.`)
      return;
    }

    // firebase: the `topost` variable to `posts`
    firebasePush({
      ref:'news',
      child:user,
      push:topost
    })
  }

  return (
    <React.Fragment>
      <h1>Create News</h1>

      <table>
        <RowCell
          Row={<Input
            retrieveValue={text => setpost(`text`, text)}
            hint={`Text`} />}
          Name={`Enter Text For Post`}
        />

        <RowCell
          Row={<Select
            retrieveValue={type => setpost(`type`, type)}
            data={[`Choose`, `Post`, `Announcement`]} />}
          Name={`Enter Type of Post`}
        />
      </table>

      <button className="btn btn-danger" onClick={() => submit()}>Submit</button>

    </React.Fragment>
  )
}