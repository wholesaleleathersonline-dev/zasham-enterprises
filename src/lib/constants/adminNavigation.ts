import {
  FaTachometerAlt,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaUserPlus,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { IconType } from "react-icons";

export interface AdminNavigationItem {
  name: string;
  href: string;
  icon: IconType;
}

export const adminNavigation: AdminNavigationItem[] = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: FaTachometerAlt,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: FaBoxOpen,
  },
  {
    name: "Create Invoice",
    href: "/admin/invoices/create",
    icon: FaFileInvoiceDollar,
  },
  {
    name: "Add Customer",
    href: "/admin/customers/create",
    icon: FaUserPlus,
  },
  {
    name: "Revenue Stats",
    href: "/admin/revenue",
    icon: FaChartLine,
  },
  {
    name: "Admin Settings",
    href: "/admin/settings",
    icon: FaCog,
  },
];