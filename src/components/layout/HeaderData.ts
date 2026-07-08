export interface SubMenuItem {
  title: string;
  href: string;
}

export interface MenuItem {
   title: string;
  href?: string;
  children?: SubMenuItem[];

  badge?: string;
  heading?: string;
  description?: string;
  features?: string[];
  cta?: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    href: "/",
  },

  {
    title: "Team Uniforms",
  badge: "Premium Sportswear",
  heading: "Custom Team Uniforms",
  description:
    "Premium sublimation team uniforms manufactured in Pakistan for schools, clubs and professional teams worldwide.",
  features: [
    "MOQ 10 Sets",
    "Free Mockup",
    "Premium Fabric",
    "Worldwide Shipping",
  ],



    children: [
      {
        title: "Basketball",
        href: "/team-uniforms/basketball",
      },


      


      {
        title: "American Football",
        href: "/team-uniforms/american-football",
      },

      {
        title: "Flag Football",
        href: "/team-uniforms/flag-football",
      },

      {
        title: "Baseball",
        href: "/team-uniforms/baseball",
      },

      {
        title: "Soccer",
        href: "/team-uniforms/soccer",
      },

      {
        title: "Volleyball",
        href: "/team-uniforms/volleyball",
      },

      {
        title: "Rugby",
        href: "/team-uniforms/rugby",
      },

      {
        title: "Cricket",
        href: "/team-uniforms/cricket",
      },

      {
        title: "Ice Hockey",
        href: "/team-uniforms/ice-hockey",
      },
    ],
  
  },

  {
    title: "Team Apparel",

  badge: "Premium Team Apparel",
  heading: "Custom Team Apparel",
  description:
    "Premium sublimation team Apparel manufactured in Pakistan for schools, clubs and professional teams worldwide.",
  features: [
    "MOQ 10 Sets",
    "Free Mockup",
    "Premium Fabric",
    "Worldwide Shipping",
  ],



    children: [
      {
        title: "Tracksuits",
        href: "#",
      },

      {
        title: "Training Shirts",
        href: "#",
      },

      {
        title: "Compression Wear",
        href: "#",
      },

      {
        title: "Polo Shirts",
        href: "#",
      },
    ],
  },

  {
    title: "Accessories",
      badge: "Premium Team Accessories",
  heading: "Custom Team Accessories",
  description:
    "Premium sublimation team accessories manufactured in Pakistan for schools, clubs and professional teams worldwide.",
  features: [
    "MOQ 10 Sets",
    "Free Mockup",
    "Premium Fabric",
    "Worldwide Shipping",
  ],

    children: [
      {
        title: "Backpacks",
        href: "#",
      },

      {
        title: "Duffle Bags",
        href: "#",
      },

      {
        title: "Arm Sleeves",
        href: "#",
      },

      {
        title: "Socks",
        href: "#",
      },

      {
        title: "Gloves",
        href: "#",
      },
    ],
  },

  {
    title: "Factory",
    href: "/factory",
      badge: "GET FREE QUOTE",
  },

  {
    title: "About Us",
    href: "/about",
  },

  {
    title: "Contact Us",
    href: "/contact",
  },
];