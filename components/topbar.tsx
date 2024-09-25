"use client"

import Link from 'next/link'
import { Menu, Upload, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function TopBar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth')
  }

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-primary">AssistenteJurídico AI</Link>
        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Início
          </Link>
          {user && (
            <Link href="/upload" className="text-foreground hover:text-primary transition-colors">
              Upload e Análise
            </Link>
          )}
        </nav>
        <nav className="hidden md:flex space-x-4 items-center">
          {user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem onSelect={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onSelect={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {user && (
                <>
                  <Link
                    href="/upload"
                    className="text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Upload e Análise
                  </Link>
                  <Button variant="ghost" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </Button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}