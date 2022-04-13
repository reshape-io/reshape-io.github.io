import * as React from "react"
import { useState, useEffect } from "react"
import keys from "../../secrets"
const airtable = require('airtable')

const data = {
  'ytLink': 'https://youtu.be/fvadj6uup_4'
}

function formatDate(d) {
  return (d.getMonth() + 1) 
    + '/' +
      d.getDate() 
    + '/' +  
      d.getFullYear();
}

function IndexPage() {
  const [tbl, setTbl] = useState(null);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState({color: '', text: ''});

  useEffect(() => {
    airtable.configure({
      apiKey: keys.apiKey
    })
    setTbl(airtable.base(keys.baseId)("Mailing List"))
    console.log('configured airtable')
  }, [])
  
  const addToMailingList = () => {
    tbl.create({
      Date: formatDate(new Date()),
      email: email,
    }, (err, _) => {
      if (err) {
        setMsg({
          color: 'text-red-500',
          text: 'Unable to add to mailing list. Please try again...'
        })
        return;
      }
      else {
        console.log('successfully added to mailing list');
        setEmail('')
        setMsg({
          color: 'text-green-500',
          text: 'Successfully added to mailing list!'
        })
      }
    })
  }

  const handleButtonSubmit = () => {
    if (email !== '') {
      addToMailingList()
    }
    else {
      alert('Fill out email field before submitting.')
      console.error("stop it")
    }
  }


  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <section className="h-full max-w-xl md:max-w-2xl flex flex-col justify-center items-center">
        <h3 className="text-lg md:text-2xl font-semibold my-10">Reshape.io</h3>
        <div className="flex flex-col justify-center items-center text-center my-5 mx-1 md:mx-2">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight my-2">
            Data analytics has never been 
            <span className="text-cyan-500">{' '}easier</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            Sign up to get notified when we launch! 
            In the mean time, you can check out our demo{' '}
            <a target="_blank" href={data.ytLink} className="text-cyan-500 underline">
              here
            </a>
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center my-5 space-y-5">
          <input 
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            value={email}
            className="placeholder:text-slate-500 w-3/4 px-6 py-3 bg-stone-100 rounded-md text-black"
          />
          <button
            onClick={() => handleButtonSubmit()}
            className="w-3/4 py-3 px-8 bg-cyan-500 hover:bg-cyan-600 
            text-white font-semibold rounded-lg">
            Notify me
          </button>
          <p 
            className={msg.color}>
            {msg.text}
          </p>
        </div>
        <div className="text-sm text-slate-400 mx-3">
          <p className="text-center">Copyright © 2021 Reshape.io. All rights reserved.</p>
        </div>
      </section>
    </main>
  )
}

export default IndexPage
