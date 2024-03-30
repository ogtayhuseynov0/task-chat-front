"use client";

import { useEffect, useState } from "react";
import { AuthModal } from "../web-components/auth-modal";

export const ModalProvider = () => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  );
};

