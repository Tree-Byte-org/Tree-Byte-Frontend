'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AdoptTreeModal from '@/components/adopt-tree/adopt-tree-modal';

export default function AdoptTreeButton({ projectId }: { projectId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Adopt Tree</Button>
      <AdoptTreeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        projectId={projectId}
      />
    </>
  );
}
