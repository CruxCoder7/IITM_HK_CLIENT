"use client"
import axios from "axios"
import { Anton } from "next/font/google"
import Link from "next/link"
import { useEffect, useState } from "react"
import getData from "../jwt"

const AntonFont = Anton({
  weight: ["400"],
  subsets: ["latin"],
})

export default function Navbar() {
  const [name, setName] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      return
    }
    const user = getData(token)
    console.log(user)
    if (!user) return
    // @ts-ignore
    setName(user.name)
    // if (!token) return
    // async function check() {
    //   const data = await axios.post(
    //     "http://localhost:5000/verify",
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   const { name, phone_num } = data.data
    // }
    // if (token) check()
  }, [])

  return (
    <nav className="w-full flex items-center justify-center">
      <div className="w-[75%] mt-7 h-14 bg-white rounded-lg shadow-lg flex justify-between items-center p-5">
        <h2 className={`${AntonFont.className}`}>CYBERPUNKS</h2>
        <div className="flex gap-5 items-center justify-center">
          <h2 className="text-[#5651e5] cursor-pointer font-medium">
            <Link
              href={"#"}
              onClick={() => window.location.replace("http://localhost:8501")}
            >
              Dashboard
            </Link>
          </h2>
          <h2 className="text-[#5651e5] cursor-pointer font-medium">
            <Link href={"/simulate"}>Simulate</Link>
          </h2>
          <h2 className="text-[#5651e5] cursor-pointer font-medium">
            {name === "" ? (
              <Link href={"/login"}>Login</Link>
            ) : (
              <Link
                href={"#"}
                onClick={() => {
                  localStorage.removeItem("token")
                  window.location.reload()
                }}
              >
                {name.toUpperCase()}
              </Link>
            )}
          </h2>
        </div>
      </div>
    </nav>
  )
}
