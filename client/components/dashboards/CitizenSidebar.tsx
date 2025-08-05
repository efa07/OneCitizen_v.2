'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  FileText,
  Bell,
  LifeBuoy,
} from 'lucide-react';

const citizenLinks = [
  { href: '/dashboard/citizen', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/citizen/services', label: 'Services', icon: Layers },
  { href: '/dashboard/citizen/requests', label: 'Requests', icon: FileText },
  { href: '/dashboard/citizen/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/citizen/support', label: 'Support', icon: LifeBuoy },
];

export default function CitizenSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<{ name?: string; faydaId?: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Welcome,</h2>
          <p className="text-sm text-gray-300 truncate">{userInfo?.name || userInfo?.faydaId || 'Citizen'}</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {citizenLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-700 ${
                pathname === href ? 'bg-gray-800 font-medium' : ''
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-grow bg-gray-100 dark:bg-black p-6 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}
