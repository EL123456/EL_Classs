import React from 'react'

export default function RegisterButton({setGonnaRegister}) {
    function onSubmit () {
        setGonnaRegister(true);
    }
  return (
    <form onSubmit={onSubmit}>
        <button>register</button>
    </form>
  )
}
