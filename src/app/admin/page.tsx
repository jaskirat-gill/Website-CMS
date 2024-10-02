"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/orders");
  }, [router]);

  return null;
}

export default Admin;
