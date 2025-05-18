"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Mail, User, Lock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [userName, setUserName] = useState("")

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors = {
      name: formData.name.trim() === "" ? "Name is required" : "",
      email: !formData.email ? "Email is required" : !validateEmail(formData.email) ? "Please enter a valid email" : "",
      password: formData.password.length < 6 ? "Password must be at least 6 characters" : "",
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return
    }

    // Submit form
    setIsSubmitting(true)
    setUserName(formData.name) // Store the user's name

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/") // Redirect to home page
      }, 2000)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Left side - Image with quote */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="https://i.pinimg.com/736x/ea/8c/d4/ea8cd4dfe9012a8903c9c5eaaaca620b.jpg"
          alt="Runner at sunset"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-md text-white"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-1 bg-white mb-6"
            />
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-3xl md:text-4xl font-light italic mb-6 leading-relaxed"
            >
              "The miracle isn't that I finished. The miracle is that I had the courage to start."
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl font-medium"
            >
              — John Bingham
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2432C5] to-[#4B5FFF] bg-clip-text text-transparent">Create your account</h1>
            <p className="text-neutral-600 mt-3 text-lg">Join our community today</p>
          </motion.div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
            >
              <CheckCircle2 className="mx-auto h-14 w-14 text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold text-green-800 mb-3">Welcome, {userName}!</h3>
              <p className="text-green-700 text-lg">Your account has been successfully created. Redirecting you to the home page...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-700 text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`pl-10 text-black h-12 rounded-lg border-2 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : "border-neutral-200 focus-visible:ring-[#2432C5] focus-visible:border-[#2432C5]"}`}
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-700 text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`pl-10 text-black h-12 rounded-lg border-2 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "border-neutral-200 focus-visible:ring-[#2432C5] focus-visible:border-[#2432C5]"}`}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-neutral-700 text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className={`pl-10 text-black h-12 rounded-lg border-2 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : "border-neutral-200 focus-visible:ring-[#2432C5] focus-visible:border-[#2432C5]"}`}
                    />
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#2432C5] to-[#4B5FFF] hover:from-[#4B5FFF] hover:to-[#2432C5] text-white text-lg font-medium rounded-lg transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-xl"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                    {!isSubmitting && (
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.span>
                    )}
                  </span>
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-neutral-600 text-lg">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#2432C5] font-semibold hover:text-[#4B5FFF] transition-colors">
                    Log in
                  </Link>
                </p>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
