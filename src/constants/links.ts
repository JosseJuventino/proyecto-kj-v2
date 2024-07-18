import { LinksHeader } from "@/services/types";

export const linksLoggedIn: LinksHeader[] = [
  { text: "Inicio", href: "/" },
  { text: "Panel", href: "/dashboard" },
  { text: "Proyectos", href: "/dashboard/projects" },
  { text: "Favoritos", href: "/dashboard/favorites" },
];

export const linksLoggedOut: LinksHeader[] = [
  { text: "Inicio", href: "#" },
  { text: "Nosotros", href: "#" },
  { text: "Contacto", href: "#" },
];
