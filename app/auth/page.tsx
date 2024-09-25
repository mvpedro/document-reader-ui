"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      router.push('/upload')
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Entrar' : 'Registrar'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              {isLogin ? 'Entrar' : 'Registrar'}
            </Button>
          </form>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 w-full"
          >
            {isLogin ? 'Registrar' : 'Já tem uma conta? Entrar'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}