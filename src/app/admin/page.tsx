"use client"
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Login() {
  return (
    <>
      <div>Hello World</div>

      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Sign Out
      </Button>
    </>
  );
}

export default Login
