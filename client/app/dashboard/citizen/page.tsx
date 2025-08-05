'use client';

import { useEffect, useState } from "react";
import {Calendar02} from "@/components/utils/Calander"
type UserInfo = {
  name: string;
  role: string;
  email?: string;
};
import Link from "next/link";

export default function CitizenDashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (err) {
        console.error("Failed to parse user info:", err);
      }
    }
  }, []);

  return (
    <div className="space-y-6">

      <section className="rounded-xl bg-muted/50 p-6 shadow-sm flex items-center aligh-center flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Welcome, {user?.name || "Citizen"} 👋</h1>
          <p className="text-muted-foreground">This is your personalized dashboard for accessing public services.</p>
        </div>
        <Calendar02 />
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href={"/dashboard/health"} >
        <div className="rounded-lg bg-primary/10 p-4 shadow-sm hover:bg-primary/20 transition-colors">
          <h3 className="font-medium">🏥 Health Records</h3>
          <p className="text-sm text-muted-foreground">View your medical history and vaccination data.</p>
        </div>
        </Link>

          <Link href={"/dashboard/education"}>

        <div className="rounded-lg bg-primary/10 p-4 shadow-sm hover:bg-primary/20 transition-colors">
          <h3 className="font-medium">📄 ID & Certificates</h3>
          <p className="text-sm text-muted-foreground">Access your Fayda ID, birth certificate, and more.</p>
        </div>
       </Link>

<Link href={"/dashboard/local-services"}>
        <div className="rounded-lg bg-primary/10 p-4 shadow-sm hover:bg-primary/20 transition-colors">
          <h3 className="font-medium">🏛️ Service Requests</h3>
          <p className="text-sm text-muted-foreground">Submit and track government service requests.</p>
        </div>
        </Link>
      </section>

      <section className="rounded-xl bg-muted/50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          <li>Checked vaccination record – July 23</li>
          <li>Requested birth certificate – July 15</li>
          <li>Updated profile info – July 1</li>
        </ul>
      </section>
    </div>
  );
}
