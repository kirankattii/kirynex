"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(
  undefined
);

export const ProjectModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ProjectModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ProjectModalContext.Provider>
  );
};

export const useProjectModal = () => {
  const context = useContext(ProjectModalContext);
  if (context === undefined) {
    throw new Error('useProjectModal must be used within ProjectModalProvider');
  }
  return context;
};

