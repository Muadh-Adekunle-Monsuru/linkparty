"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/dashboard/Header"
import Logo from "@/components/ui/Logo"
import JoinCard from "@/components/JoinCard"

export default function page() {
  return (
    <div className="mx-auto flex h-svh max-w-7xl flex-col p-4">
      <Logo />
      <div className="flex flex-grow items-center justify-center py-12">
        <JoinCard />
      </div>
    </div>
  )
}
