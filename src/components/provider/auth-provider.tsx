"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import Loader from "../loader";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [hasHydrated, isAuthenticated, router]);

  // Wait until localStorage has been loaded.
  if (!hasHydrated || !isAuthenticated) {
    return <Loader />;
  }

  return <div>{children}</div>;
};

export default AuthProvider;
