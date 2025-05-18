"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import type { JSX } from "react/jsx-runtime"
import { useRouter } from "next/navigation"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    id: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const router = useRouter()


  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-gray-200 rounded-full bg-white/90 backdrop-blur-md shadow-[0_0_15px_rgba(36,50,197,0.2)] z-[5000] pr-2 pl-6 py-2 items-center justify-center space-x-4",
        className,
      )}
    >
      {/* Logo on the left */}
      <Link href="/" className="flex items-center mr-2">
        <div className="relative w-8 h-8 mr-2">
          <Image src="https://i.pinimg.com/736x/28/33/bd/2833bd04872d19c46799a7914a34f2a4.jpg" width={40} height={40} alt="Core Logo" className="rounded-full bg-[#2432C5]/20" />
          <div className="absolute inset-0 rounded-full border border-[#2432C5]/30 animate-pulse"></div>
        </div>
        <span className="font-bold text-gray-800 text-sm hidden sm:inline-block">
          BOOOM <span className="text-[#2432C5]"></span>
        </span>
      </Link>

      {navItems.map((navItem, idx) => (
        <Link
          key={`link-${idx}`}
          href={navItem.link || "#"}

          className="relative text-gray-600 items-center flex space-x-1 hover:text-[#2432C5] transition-colors duration-200 px-2 py-1 text-sm"
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block">{navItem.name}</span>
        </Link>
      ))}

      <button
        className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#2432C5] focus:ring-offset-2 focus:ring-offset-white group"
      >
         <Link href="/signup">
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-blue-600 bg-[conic-gradient(from_90deg_at_50%_50%,#2432C5_0%,#ffffff_50%,#2432C5_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-5 py-1 text-sm font-medium text-gray-800 backdrop-blur-3xl relative group-hover:bg-gray-50 transition-colors duration-200">
          <span className="mr-1 ">sign in</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200"
          >
            <path
              d="M6.5 3.5L11 8L6.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute inset-x-0 w-2/3 mx-auto -bottom-px bg-gradient-to-r from-transparent via-[#2432C5] to-transparent h-px" />
    
         
        </span>
        </Link>
      </button>
    </motion.div>
  )
}