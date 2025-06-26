'use client'

import { User } from "@prisma/client"
import UserBox from "./UserBox"

interface Props{
    items:User[]
}
const UserList:React.FC<Props> = ({items}) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0" >
     <div className="px-5">
        <div className="flex-col">
           <div className="text-xl text-neutral-800 font-bold py-2">
              People
           </div>
        </div>
        {
            items.map((it)=>(
                <UserBox key={it.id} data={it} />
            ))
        }
     </div>
     </aside>
  )
}

export default UserList
