import { cn } from '@/utils/cn';
import React from 'react'

type Props={};

export default function Container(props:React.HTMLProps<HTMLDivElement>) {
    return (
        <div
        {...props}
        className={cn('w-full bg-white border border-gray-100 rounded-xl flex py-4 shadow-md',
        props.className
        )}
        
        />

    )
}

