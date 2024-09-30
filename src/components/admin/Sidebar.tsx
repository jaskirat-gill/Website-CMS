import Link from "next/link";
import { Package, ShoppingCart, Users, LineChart, Home, Settings, Gauge } from "lucide-react";
import NavigationItem from "./NavigationItem";
import { STORE_NAME } from "@/lib/config";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6" />
            <span className="">{STORE_NAME}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavigationItem
              href="#"
              icon={<Gauge className="h-4 w-4" />}
              label="Dashboard"
              isActive={pathname.startsWith("/admin/dashboard")}
            />
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
          </nav>
        </div>
        <div className="border-t pt-2">
          <NavigationItem
            href="/admin/settings"
            icon={<Settings className="h-4 w-4" />} 
            label="Settings"
            isActive={pathname.startsWith("/admin/settings")}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
