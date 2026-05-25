'use client';

import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function SidebarTocPortal({
  children,
}: {
  children: ReactNode;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(document.getElementById('sidebar-toc-slot'));
  }, []);

  if (!target) return null;
  return createPortal(children as any, target) as any;
}
