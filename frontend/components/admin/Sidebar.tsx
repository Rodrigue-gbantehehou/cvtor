'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils';
const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Templates', href: '/admin/templates' },
  { name: 'Nouveau Template', href: '/admin/templates/new' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-gray-900 text-white w-64">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800',
              pathname === item.href ? 'bg-gray-800' : 'text-gray-300'
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}