import React from 'react'
import SignUpIn from '../../components/SignUpIn'
import { SessionProvider } from 'next-auth/react'



export default function page () {
  return (
    
    <div>
       <SessionProvider ><SignUpIn/></SessionProvider>
        
    </div>
   
  )
}