"use client"
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from '@/components/Spinner';
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      router.replace("/dashboard");
    } else {
      router.replace("/Signup");
    }
  }, [router]);

  return <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
}