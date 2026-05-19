'use client'
import { useEffect, useState } from 'react'
export default function Users() {
 const [users, setUsers] = useState([])
 useEffect(() => {
   fetch('http://localhost:3000/users', {
    headers: {
        'x-aula-pos': 'show'
    }
   })
     .then(res => res.json())
     .then(data => setUsers(data))
 }, [])
 return (
   <div>
     <h1>Usuários</h1>
     {users.map((user: any) => (
       <div key={user.id}>
         {user.name}
       </div>
     ))}
   </div>
 )
}
