import React, { useEffect, useState } from "react"

import Select from '../reusable-components/Select'
import RowCell from '../reusable-components/RowCell'
import Input from '../reusable-components/Input'
import { bake_cookie, read_cookie } from "sfcookies"

// import firebaseSet from '../../firebase/firebase-tools/firebaseSet'
import firebasePush from '../firebase/firebase-tools/firebasePush'

import isEmpty from '../tools/isEmpty'

export default function CreateAnnouncement() { // type,text

  // type,text,date,user
  const [post, postset] = useState({})

  function setpost(key, value) { // can be reusable 
    
    // if(key===`type` && !(key in value)){ // if user didn't choose anything from dropdown menu
    //   return;
    // }

    const tmp = { ...post }
    tmp[key] = value
    postset(tmp)
  }



  function submit() {

    // extra attributes
    let date = new Date() + ``
    let user = read_cookie(`currentUser`)

    // reassign
    let topost = { ...post }
    topost['date'] = date
    topost['user'] = user

    if (isEmpty(user)) {
      alert(`user did not sign in yet.`)
      return;
    }

    // firebase: the `topost` variable to `posts`
    firebasePush({
      ref: 'news',
      push: topost
    })

    // firebasePush({
    //   ref:'news',
    //   child:user,
    //   push:topost
    // })
  }

  return (
    <React.Fragment>

      {isEmpty(read_cookie(`currentUser`)) ? `not signed in` :

        <div align="middle">
          <h1>Create News</h1>

          <table>
            <RowCell // {Row,Name}
              Row={<Input
                retrieveValue={text => setpost(`text`, text)}
                hint={`Text`} />}
              Name={`Enter Text For Post`}
            />

            <RowCell //{Row,Name}
              Row={<Select
                retrieveValue={type => setpost(`type`, type)}
                data={[`Choose`, `news`, `post`]} />}
              Name={`Enter Type of Post`}
            />
          </table>

          <button className="btn btn-danger" onClick={() => submit()}>Submit</button>

        </div>
      }



    </React.Fragment>
  )
}