'use client';

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
    href: string,
    active?: boolean,
    icon: any,
    onClick?: () => void
}
const MobileItem: React.FC<MobileItemProps> = ({ href, active, icon:Icon, onClick }) => {
    
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <Link href={href} onClick={handleClick} className={clsx(`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`, active && 'bg-gray-500 text-black ')} >
         <Icon className="h-6 w-6" />
        </Link>
    )
}

export default MobileItem
