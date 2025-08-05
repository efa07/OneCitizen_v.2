'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { Loader2 } from "lucide-react"


export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      const { role } = JSON.parse(stored);
      switch (role) {
        case "CITIZEN":
          router.replace("/dashboard/citizen");
          break;
        case "ADMIN":
          router.replace("/dashboard/admin");
          break;
        case "DEPARTMENT_HEAD":
          router.replace("/dashboard/department");
          break;
        default:
          router.replace("/dashboard/citizen");
      }
    }else{
      router.replace("/")
    }
  }, []);

  return <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>;
}
