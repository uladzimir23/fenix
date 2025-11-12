// src/pages/Files/Files.tsx
import React from 'react';
import { Container } from '@/shared/ui/Layout/Container/Container';
import { UserFilesPage } from '@/features/user-files';

export const Files: React.FC = () => {
  return (
    <div className="page">
      <Container>
        <UserFilesPage />
      </Container>
    </div>
  );
};