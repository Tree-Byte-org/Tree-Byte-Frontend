import { TreePine, BookOpen, Leaf, MapPin, Globe, Users } from "lucide-react"

export const navItems = [
  {
    name: "Home",
    href: "/",
    icon: TreePine,
  },
  {
    name: "About",
    href: "/#about",
    icon: BookOpen,
    children: [
      { name: "What is Tree Byte", href: "/#what-is-tree-byte" },
      { name: "How it works", href: "/#how-it-works" },
      { name: "Ecosystem pillars", href: "/#ecosystem-pillars" },
    ],
  },
  {
    name: "Benefits",
    href: "/#benefits",
    icon: Leaf,
    children: [
      { name: "For individuals", href: "/#benefits-individuals" },
      { name: "For companies", href: "/#benefits-companies" },
      { name: "For farms", href: "/#benefits-farms" },
    ],
  },
  {
    name: "Farms",
    href: "/#farms",
    icon: MapPin,
  },
  {
    name: "Roadmap",
    href: "/#roadmap",
    icon: Globe,
  },
  {
    name: "Community",
    href: "/#community",
    icon: Users,
  },
]
