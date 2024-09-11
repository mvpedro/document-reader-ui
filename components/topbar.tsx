import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TopBar() {
  return (
    <header className="w-full border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-primary">Logo</Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/upload" className="text-foreground hover:text-primary transition-colors">
            Upload and Chat
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}