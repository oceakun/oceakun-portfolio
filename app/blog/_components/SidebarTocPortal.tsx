'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function SidebarTocPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(document.getElementById('sidebar-toc-slot'));
  }, []);

  if (!target) return null;
  return createPortal(children, target);
}
