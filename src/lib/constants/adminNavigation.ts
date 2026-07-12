import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaImages,
  FaCog,
  FaSignOutAlt,
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
    name: "Categories",
    href: "/admin/categories",
    icon: FaTags,
  },
  {
    name: "Media",
    href: "/admin/media",
    icon: FaImages,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: FaCog,
  },
  {
    name: "Logout",
    href: "/admin/logout",
    icon: FaSignOutAlt,
  },
];