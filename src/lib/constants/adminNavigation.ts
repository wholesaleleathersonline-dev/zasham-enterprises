import {
  FaTachometerAlt,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaUserPlus,
  FaChartLine,
  FaCog,
  FaRuler,
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
  name: "Invoices",
  href: "/admin/invoices",
  icon: FaFileInvoiceDollar,
},
 {
  name: "Customers",
  href: "/admin/customers",
  icon: FaUserPlus,
},
  {
    name: "Revenue Stats",
    href: "/admin/revenue",
    icon: FaChartLine,
  },

  {
  name: "Size Charts",
  href: "/admin/size-chart",
  icon: FaRuler,
},

  {
    name: "Admin Settings",
    href: "/admin/settings",
    icon: FaCog,
  },
];