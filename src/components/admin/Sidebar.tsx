import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  LineChart,
  Home,
  Settings,
} from "lucide-react";
import NavigationItem from "./NavigationItem";
import { STORE_NAME } from "@/lib/config";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { generateFakeOrders } from "@/scripts/generateFakeOrders";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-3 lg:h-[56.61px] lg:px-6 gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6" />
            <span className="">{STORE_NAME}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavigationItem
              href="#"
              icon={<ShoppingCart className="h-4 w-4" />}
              label="Orders"
              isActive={pathname.startsWith("/admin/orders")}
            />
            <NavigationItem
              href="#"
              icon={<Package className="h-4 w-4" />}
              label="Products"
              isActive={pathname.startsWith("/admin/products")}
            />
            <NavigationItem
              href="#"
              icon={<Users className="h-4 w-4" />}
              label="Customers"
              isActive={pathname.startsWith("/admin/customers")}
            />
            <NavigationItem
              href="#"
              icon={<LineChart className="h-4 w-4" />}
              label="Analytics"
              isActive={pathname.startsWith("/admin/analytics")}
            />
            <NavigationItem
              href="/admin/settings"
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              isActive={pathname.startsWith("/admin/settings")}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
