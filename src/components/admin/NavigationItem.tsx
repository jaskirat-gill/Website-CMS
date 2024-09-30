import Link from "next/link";
import { ReactNode } from "react";

interface NavigationItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  badge?: ReactNode;
  isActive?: boolean;
}

const NavigationItem = ({ href, icon, label, badge, isActive }: NavigationItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`}
    >
      {icon}
      {label}
      {badge}
    </Link>
  );
};

export default NavigationItem;
