'use client';
import Callback from '../../components/Callback';
import { Suspense } from 'react';
import Spinner from "@/components/Spinner"

export default function CallbackPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Callback />
    </Suspense>
  );
}