"use client";

import { ProjectInquiryModal } from "./ProjectInquiryModal";
import { useProjectModal } from "@/hooks/useProjectModal";

export const ProjectModalWrapper = () => {
  const { isOpen, closeModal } = useProjectModal();

  return <ProjectInquiryModal isOpen={isOpen} onClose={closeModal} />;
};

