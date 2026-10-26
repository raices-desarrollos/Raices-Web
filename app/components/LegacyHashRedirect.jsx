'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { legacyHashRoutes } from '@/content/shared';

/** Lleva las anclas de la landing anterior (`/#tipologias`, `/#contacto`…) a su página nueva. */
export default function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const target = hash && legacyHashRoutes[hash];
    if (target && target !== '/') router.replace(target);
  }, [router]);

  return null;
}
