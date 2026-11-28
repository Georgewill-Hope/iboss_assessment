import { ReactNode } from "react";
import AuthProvider from "@/components/provider/auth-provider";

export const instant = false;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
