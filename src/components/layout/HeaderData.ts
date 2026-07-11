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
    href: "/team-uniforms",
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
      href: "/team-apparel",

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
    title: "Compression Wear",
    href: "/team-apparel/compression-wear",
  },
  {
    title: "Hoodies",
    href: "/team-apparel/hoodies",
  },
  {
    title: "Tracksuits",
    href: "/team-apparel/tracksuits",
  },
  {
    title: "Warm-Up Suits",
    href: "/team-apparel/warm-up-suits",
  },
  {
    title: "T-Shirts",
    href: "/team-apparel/t-shirts",
  },
  {
    title: "Polo Shirts",
    href: "/team-apparel/polo-shirts",
  },
  {
    title: "Jackets",
    href: "/team-apparel/jackets",
  },
  {
    title: "Shorts",
    href: "/team-apparel/shorts",
  },
  {
    title: "Joggers",
    href: "/team-apparel/joggers",
  },
],
  },

  {
    title: "Accessories",
      href: "/accessories",
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
    href: "/accessories/backpacks",
  },
  {
    title: "Duffle Bags",
    href: "/accessories/duffle-bags",
  },
  {
    title: "Caps",
    href: "/accessories/caps",
  },
  {
    title: "Socks",
    href: "/accessories/socks",
  },
  {
    title: "Arm Sleeves",
    href: "/accessories/arm-sleeves",
  },
  {
    title: "Leg Sleeves",
    href: "/accessories/leg-sleeves",
  },
  {
    title: "Headbands",
    href: "/accessories/headbands",
  },
  {
    title: "Gloves",
    href: "/accessories/gloves",
  },
  {
    title: "Sports Towels",
    href: "/accessories/sports-towels",
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