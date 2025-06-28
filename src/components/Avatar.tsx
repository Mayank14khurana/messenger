'use client';

import { User } from "@prisma/client";
import Image from "next/image";

interface Props{
  user:User
}

const Avatar:React.FC<Props> = ({user}) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 ">
        <Image alt="Avatar" src={ user?.image||'/placeholder.jpg'} fill />
      </div>
    </div>
  )
}

export default Avatar;
